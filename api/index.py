import os
import uvicorn
import json
import uuid
import requests
from datetime import datetime
from io import BytesIO

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import PyPDF2
from supabase import create_client, Client
from dotenv import load_dotenv

# ==============================
# Load Environment Variables
# ==============================

# Try to load .env file if it exists (for local development)
try:
    load_dotenv()
except:
    pass

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Validate required environment variables
if not SUPABASE_URL:
    raise ValueError("Missing SUPABASE_URL environment variable")

if not SUPABASE_KEY:
    raise ValueError("Missing SUPABASE_KEY environment variable")

if not GROQ_API_KEY:
    raise ValueError("Missing GROQ_API_KEY environment variable")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ==============================
# FastAPI Setup
# ==============================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# Models
# ==============================

class ProgressRequest(BaseModel):
    cardId: str
    isCorrect: bool

class SearchRequest(BaseModel):
    query: str

# ==============================
# Utility Functions
# ==============================

def extract_pdf_text(file_buffer: BytesIO) -> str:
    """Extract text from PDF"""
    try:
        pdf_reader = PyPDF2.PdfReader(file_buffer)
        text = ""
        
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
        
        if not text.strip():
            raise ValueError("No extractable text found")
        
        return "\n".join(line.strip() for line in text.split("\n") if line.strip())
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"PDF parsing failed: {str(e)}")

def generate_flashcards(text: str) -> list:
    """Generate flashcards using Groq API (REST call, no library)"""
    try:
        prompt = f"""Extract 8-12 key concepts from this text. Return ONLY a valid JSON array.

Return EXACTLY this format:
[
  {{
    "question": "What is X?",
    "answer": "X is...",
    "explanation": "Details...",
    "difficulty": "easy"
  }}
]

Use difficulty: easy, medium, or hard

TEXT:
{text[:3000]}"""

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }
        
        data = {
            "messages": [{"role": "user", "content": prompt}],
            "model": "llama-3.1-8b-instant",
            "temperature": 0.7,
            "max_tokens": 2048,
        }
        
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=30
        )
        
        if response.status_code != 200:
            raise ValueError(f"Groq API error: {response.text}")
        
        result = response.json()
        content = result["choices"][0]["message"]["content"]
        
        start_idx = content.find("[")
        end_idx = content.rfind("]") + 1
        
        if start_idx == -1 or end_idx == 0:
            raise ValueError("No JSON array found in AI response")
        
        json_str = content[start_idx:end_idx]
        return json.loads(json_str)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

def generate_embedding(text: str) -> list:
    """Generate simple embedding (hash-based)"""
    h = 0
    for char in text:
        h = ((h << 5) - h) + ord(char)
    
    embedding = []
    for i in range(1536):
        embedding.append((hash(str(h + i)) % 1000) / 1000.0 * 2 - 1)
    
    return embedding

# ==============================
# Routes
# ==============================

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/upload")
async def upload_pdf(file: UploadFile = File(...), name: str = None):
    try:
        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files allowed")
        
        file_buffer = BytesIO(await file.read())
        text = extract_pdf_text(file_buffer)
        
        flashcards = generate_flashcards(text)
        
        document_id = str(uuid.uuid4())
        doc_name = name or file.filename.replace(".pdf", "")
        
        # Insert document
        supabase.table("documents").insert({
            "id": document_id,
            "name": doc_name,
            "created_at": datetime.utcnow().isoformat()
        }).execute()
        
        # Insert flashcards
        cards_to_insert = []
        for card in flashcards:
            embedding = generate_embedding(card["question"])
            cards_to_insert.append({
                "id": str(uuid.uuid4()),
                "document_id": document_id,
                "question": card["question"],
                "answer": card["answer"],
                "explanation": card.get("explanation", ""),
                "difficulty": card.get("difficulty", "medium"),
                "embedding": embedding,
                "created_at": datetime.utcnow().isoformat()
            })
        
        supabase.table("flashcards").insert(cards_to_insert).execute()
        
        return {
            "success": True,
            "documentId": document_id,
            "flashcardsCount": len(flashcards),
            "flashcards": flashcards
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/documents")
async def get_documents():
    try:
        docs = supabase.table("documents").select("*").order("created_at", desc=True).execute()
        
        docs_with_counts = []
        for doc in docs.data:
            cards = supabase.table("flashcards").select("id").eq("document_id", doc["id"]).execute()
            docs_with_counts.append({
                **doc,
                "cardCount": len(cards.data)
            })
        
        return docs_with_counts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/documents/{document_id}/cards")
async def get_cards(document_id: str):
    try:
        cards = supabase.table("flashcards").select(
            "id, question, answer, explanation, difficulty"
        ).eq("document_id", document_id).execute()
        
        return cards.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/progress")
async def save_progress(progress: ProgressRequest):
    try:
        supabase.table("progress").insert({
            "id": str(uuid.uuid4()),
            "card_id": progress.cardId,
            "is_correct": progress.isCorrect,
            "created_at": datetime.utcnow().isoformat()
        }).execute()
        
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/search")
async def search_cards(search: SearchRequest):
    try:
        if not search.query:
            raise HTTPException(status_code=400, detail="Query required")
        
        query_embedding = generate_embedding(search.query)
        cards = supabase.table("flashcards").select("*").execute()
        
        results = []
        for card in cards.data:
            embedding = card.get("embedding", [])
            if not embedding:
                continue
            
            similarity = sum(a*b for a, b in zip(query_embedding, embedding)) / (
                (sum(a*a for a in query_embedding)**0.5) *
                (sum(b*b for b in embedding)**0.5) + 1e-10
            )
            
            if similarity > 0.7:
                results.append({
                    "id": card["id"],
                    "question": card["question"],
                    "answer": card["answer"],
                    "similarity": similarity
                })
        
        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results[:10]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==============================
# Run Server
# ==============================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
