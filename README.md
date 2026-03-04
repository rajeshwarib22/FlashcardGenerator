# 🎯 DummyDodo - AI Flashcard Generator

Instant flashcard generation from PDFs using AI. Upload a document, get study cards in seconds.

**Live:** [https://flashcard-generator-henna.vercel.app](https://flashcard-generator-henna.vercel.app)

---

## 📖 What Is It?

DummyDodo converts any PDF into interactive flashcards using AI. Simply upload → AI generates cards → Study with progress tracking.

Perfect for:

- Students studying for exams
- Professionals learning new material
- Anyone who wants to turn documents into study tools

---

## ⚙️ How It Works

1. **Upload PDF** → Text extracted automatically using PyPDF2
2. **AI Processing** → Groq LLM generates Q&A pairs (8-12 cards per document)
3. **Store** → Save documents and flashcards to Supabase with vector embeddings
4. **Study** → Interactive flip cards with difficulty levels and progress tracking

---

## 🛠️ Tech Stack

| Component   | Technology                       |
| ----------- | -------------------------------- |
| Frontend    | React 18, Vite, Framer Motion    |
| Backend     | Python 3.11, FastAPI, Uvicorn    |
| Database    | Supabase (PostgreSQL + pgvector) |
| LLM         | Groq API (llama-3.1-8b-instant)  |
| PDF Parsing | PyPDF2 (Python)                  |
| Styling     | Tailwind CSS                     |
| Deployment  | Vercel (Frontend), Railway (API) |

---

## 🚀 Deployment Architecture

```
Frontend (Vercel)
└── https://flashcard-generator-henna.vercel.app

Backend API (Railway)
└── https://flashcardgenerator-production.up.railway.app

Database (Supabase)
└── PostgreSQL + pgvector for embeddings
```

---

## 🤖 How Groq LLM Works

Groq is an ultra-fast AI inference platform. When you upload a PDF:

1. **PDF Text Extraction** → PyPDF2 extracts text from the uploaded file
2. **Prompt Engineering** → Text is sent to Groq API with a structured prompt
3. **AI Generation** → Groq's `llama-3.1-8b-instant` model generates:
   - Questions
   - Answers
   - Explanations
   - Difficulty levels (easy, medium, hard)
4. **Data Storage** → Generated cards saved to Supabase with embeddings for semantic search

**Why Groq?**

- ⚡ Ultra-fast inference (1-2 seconds)
- 🆓 Free tier: 30 requests/minute
- 🔑 No credit card required
- 📊 High-quality outputs
- 🎯 Perfect for real-time AI applications

---

## 📊 API Endpoints

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| POST   | `/api/upload`               | Upload PDF, generate cards |
| GET    | `/api/documents`            | List all documents         |
| GET    | `/api/documents/{id}/cards` | Get flashcards for doc     |
| POST   | `/api/progress`             | Save study progress        |
| POST   | `/api/search`               | Search flashcards          |
| GET    | `/api/health`               | Health check endpoint      |

---

## 🔧 Backend Architecture (Python FastAPI)

The backend is a Python FastAPI application deployed on Railway:

```python
# Key Features:
- FastAPI for REST API endpoints
- PyPDF2 for PDF text extraction
- Groq API integration for LLM
- Supabase client for database operations
- CORS middleware for frontend communication
- Vector embeddings for semantic search
```

**Flow:**

```
PDF Upload → Text Extraction → Groq API → JSON Generation →
Embedding Generation → Supabase Insert → Response to Frontend
```

## 🎨 Frontend Features

- **Landing Page** → Beautiful hero section with feature highlights
- **PDF Upload** → Drag-and-drop or file selection
- **Document Management** → View all uploaded documents with card counts
- **Interactive Flashcards** → Flip cards to reveal answers
- **Real-time Statistics** → Track accuracy, correct/incorrect answers
- **Progress Tracking** → See your study progress percentage
- **Responsive Design** → Works on desktop, tablet, and mobile
- **Smooth Animations** → Framer Motion for polished UI transitions

---

## 🎯 Key Features

✅ **No Sign-up Required** - Start immediately without registration
✅ **Free to Use** - No payment, no subscriptions
✅ **Fast Processing** - Generate cards in seconds
✅ **AI-Powered** - Intelligent content extraction and card generation
✅ **Progress Tracking** - Detailed statistics on your learning
✅ **Cloud Storage** - All data saved securely in Supabase
✅ **Semantic Search** - Find flashcards using vector embeddings
✅ **Difficulty Levels** - Easy, Medium, Hard cards for adaptive learning

---

## 💰 Total Cost: $0/Month

- **Frontend Hosting** - Vercel (Free)
- **Backend Hosting** - Railway (Free tier includes $5 credit)
- **Database** - Supabase (Free tier: 500MB storage, 2GB bandwidth)
- **LLM API** - Groq (Free tier: 30 req/min, no credit card)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Git
- Vercel
- Railway
- Supabase

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access at `http://localhost:5173`

## 🔐 Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

### Backend (`api/.env`)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-public-key
GROQ_API_KEY=your-groq-api-key
```

## VITE_API_URL=your_backend_url

## 📱 Future Roadmap

- 🎥 **YouTube Video Summarizer** - Extract transcripts, generate flashcards from video content
- 📱 **Mobile App** - React Native version for iOS/Android
- 🧠 **Spaced Repetition** - SM-2 algorithm for optimal review scheduling
- 🔍 **Advanced Search** - Full-text search with filters
- 📊 **Analytics Dashboard** - Detailed learning analytics
- 🗣️ **Audio Support** - Listen to flashcards
- 🎨 **Custom Themes** - Dark mode and custom color schemes
- 📤 **Export Options** - Download flashcards as CSV/JSON
- 👥 **Study Groups** - Share flashcards with friends

---

## 🐛 Troubleshooting

### API Connection Issues

- Check `VITE_API_URL` environment variable in Vercel
- Ensure Railway backend is running and accessible
- Verify CORS is enabled in FastAPI backend

### PDF Upload Failures

- Ensure PDF is not corrupted
- Check file size (larger PDFs may take longer)
- Verify Groq API key is valid

### Database Connection Issues

- Verify Supabase URL and key are correct
- Check Supabase project is active
- Ensure database tables are created with correct schema

---

## 🤝 Contributing

Contributions welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📧 Support

For issues or questions:

- Check the [GitHub Issues](https://github.com/rajeshwarib22/FlashcardGenerator)
- Review deployment logs on Vercel and Railway
- Check Supabase console for database issues

---

## ✨ Credits

Built with ❤️ using:

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Supabase](https://supabase.com/)
- [Groq](https://groq.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**© 2026 DummyDodo - AI Flashcard Generator**
