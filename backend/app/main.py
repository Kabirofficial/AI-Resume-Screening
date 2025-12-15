from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import JobDescription, MatchResponse
from app.services import pdf_parser, vector_db, llm_engine

app = FastAPI(title="AI Resume Screener")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    text = await pdf_parser.extract_text_from_pdf(file)
    vector_db.add_resume(text, file.filename)
    return {"message": f"Resume {file.filename} processed successfully"}

@app.post("/match", response_model=MatchResponse)
async def match_candidates(jd: JobDescription):
    search_results = vector_db.query_resumes(jd.text, n_results=3)
    
    analyzed_candidates = []
    for idx, resume_text in enumerate(search_results['documents'][0]):
        analysis = llm_engine.analyze_fit(resume_text, jd.text)
        analyzed_candidates.append(analysis)
        
    return {"matches": analyzed_candidates}