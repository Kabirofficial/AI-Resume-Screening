# 🎯 AI Resume Screening

An intelligent resume screening application powered by **Google Gemini AI** that helps recruiters and hiring managers efficiently match candidates to job descriptions using semantic search and AI-powered analysis.

![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-00997B?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19.2+-61DAFB?logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0+-06B6D4?logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?logo=google&logoColor=white)

## ✨ Features

- **📄 PDF Resume Upload** – Drag & drop or click to upload PDF resumes for processing
- **🔍 Semantic Search** – Uses ChromaDB vector embeddings for intelligent candidate matching
- **🧠 AI-Powered Analysis** – Google Gemini 2.5 Flash provides detailed candidate-job fit analysis
- **📊 Match Scoring** – Get 0-100 match scores with detailed reasoning
- **� Skills Analysis** – Identifies candidate strengths and missing skills
- **⚡ Modern UI** – Beautiful glassmorphism design with smooth animations

## 🖥️ Screenshots

The application features:
- **Hero Section** – Eye-catching gradient header
- **File Upload** – Drag & drop resume upload with progress indicators
- **Job Description Panel** – Large text area for pasting job requirements
- **Results Cards** – Detailed match analysis with scores, strengths, and gaps

## 🏗️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance Python web framework |
| **Google Gemini AI** | LLM for resume-job fit analysis (gemini-2.5-flash) |
| **ChromaDB** | Vector database for semantic similarity search |
| **PyPDF2** | PDF text extraction |
| **Pydantic** | Request/response data validation |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | Modern UI library with hooks |
| **Vite 7** | Next-generation frontend build tool |
| **TailwindCSS 4** | Utility-first CSS framework |
| **Axios** | HTTP client for API calls |
| **Lucide React** | Beautiful icon library |

## 📁 Project Structure

```
AI-Resume-Screening/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app & endpoints
│   │   ├── config.py            # Environment settings
│   │   ├── schemas.py           # Pydantic request/response models
│   │   └── services/
│   │       ├── pdf_parser.py    # PDF text extraction
│   │       ├── vector_db.py     # ChromaDB operations
│   │       └── llm_engine.py    # Gemini AI integration
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # React entry point
│   │   ├── index.css            # Global styles & CSS variables
│   │   ├── App.css              # App-specific styles
│   │   └── components/
│   │       ├── FileUpload.jsx   # Drag & drop file upload
│   │       ├── MatchResult.jsx  # Candidate analysis card
│   │       ├── Hero.jsx         # Header section
│   │       ├── Footer.jsx       # Footer component
│   │       └── Toast.jsx        # Notification toasts
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **Google Gemini API Key** – Get it from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file with your Gemini API key:**
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Start the backend server:**
   ```bash
   uvicorn app.main:app --reload
   ```

   ✅ API available at `http://localhost:8000`  
   📚 Swagger docs at `http://localhost:8000/docs`

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   ✅ App available at `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Upload a PDF resume for processing |
| `POST` | `/match` | Match candidates against a job description |

### Upload Resume

```bash
curl -X POST "http://localhost:8000/upload" \
  -F "file=@resume.pdf"
```

**Response:**
```json
{
  "message": "Resume resume.pdf processed successfully"
}
```

### Match Candidates

```bash
curl -X POST "http://localhost:8000/match" \
  -H "Content-Type: application/json" \
  -d '{"text": "Looking for a Senior Python Developer with 5+ years experience..."}'
```

**Response:**
```json
{
  "matches": [
    {
      "candidate_name": "John Doe",
      "match_score": 85,
      "summary": "Strong Python background with relevant experience...",
      "strengths": ["Python", "FastAPI", "AWS"],
      "missing_skills": ["Kubernetes"],
      "experience_years": 6
    }
  ]
}
```

## 🔧 Configuration

### Backend (`backend/app/config.py`)

| Variable | Description | Default |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key | (from `.env`) |
| `CHROMA_DB_PATH` | ChromaDB storage path | `chroma_db` |

### CORS Settings (`backend/app/main.py`)

Update `allow_origins` for production:
```python
allow_origins=["http://localhost:5173", "https://yourdomain.com"]
```

## 📋 How It Works

1. **Upload Resumes** – PDF resumes are uploaded and text is extracted using PyPDF2
2. **Vector Storage** – Resume text is stored in ChromaDB with embeddings for semantic search
3. **Job Description Input** – Paste the job description you want to match against
4. **Semantic Search** – ChromaDB finds the top 3 most similar resumes
5. **AI Analysis** – Gemini analyzes each candidate against the job description
6. **Results Display** – View match scores, strengths, and skill gaps

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for the powerful AI model
- [ChromaDB](https://www.trychroma.com/) for the vector database
- [FastAPI](https://fastapi.tiangolo.com/) for the excellent Python framework
- [React](https://react.dev/) & [Vite](https://vite.dev/) for the frontend tooling
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS

---

<p align="center">
  Made with ❤️ by Jingg
</p>
