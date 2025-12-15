from pydantic import BaseModel
from typing import List, Optional

class JobDescription(BaseModel):
    text: str

class AnalysisResult(BaseModel):
    candidate_name: str
    match_score: int
    summary: str
    strengths: List[str]
    missing_skills: List[str]
    experience_years: Optional[float]

class MatchResponse(BaseModel):
    matches: List[AnalysisResult]