# 🎯 DummyDodo - AI Flashcard Generator

Instant flashcard generation from PDFs using AI. Upload a document, get study cards in seconds.

---

## 📖 What Is It?

DummyDodo converts any PDF into interactive flashcards using AI. Upload → AI generates cards → Study with progress tracking.

---

## ⚙️ How It Works

1. **Upload PDF** → Text extracted automatically
2. **AI Processing** → Groq LLM generates Q&A pairs (8-12 cards)
3. **Store** → Save to Supabase with embeddings
4. **Study** → Interactive flip cards with progress tracking

---

## 🛠️ Tech Stack

| Component | Tech |
|-----------|------|
| Frontend | React, Framer Motion |
| Backend | Python |
| Database | Supabase (PostgreSQL + pgvector) |
| LLM | Groq API (llama-3.1-8b-instant) |
| File Parse | pdf-parse (JavaScript) |

---

## 🤖 How Groq LLM Works

Groq is an AI inference platform. When you upload a PDF:
- Text extracted → Sent to Groq API with prompt
- Groq's Mixtral-8x7b model processes the text
- Returns JSON with questions, answers, and difficulty levels
- Backend saves to the database

**Why Groq?** Free tier (30 req/min), ultra-fast (1-2 sec), no credit card needed, high quality output.

---

## 🔧 Backend Processing (JavaScript/Node.js)

No Python used. Everything is JavaScript:
- `pdf-parse` library extracts text from PDFs (JavaScript)
- `axios` sends HTTP requests to Groq API (JavaScript)
- `@supabase/supabase-js` manages database queries (JavaScript)
- Vector embeddings generated using JavaScript math functions
- Express.js routes handle all API endpoints

**Flow:** PDF buffer → pdf-parse → text string → Groq API → JSON response → parse → generate embeddings → Supabase insert → response to frontend.

---

## 📊 Key Endpoints

- `POST /api/upload` - Upload PDF, generate cards
- `GET /api/documents` - List all documents
- `GET /api/documents/:id/cards` - Get cards for document
- `POST /api/progress` - Save study progress

---

## 🚀 Deployment

- **Frontend & Backend** Vercel (free)
- **Database:** Supabase 
- **LLM:** Groq 

**Total Cost: $0/month**

---

## 🎯 Future Scope

- 🎥 **YouTube Video Summarizer** - Extract transcripts from YouTube, generate flashcards from video content
- 📱 **Mobile App** - React Native version for iOS/Android studying on-the-go
- 🧠 **Spaced Repetition** - SM-2 algorithm to auto-schedule card review based on difficulty and performance
