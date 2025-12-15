import google.generativeai as genai
import json
import typing_extensions
from app.config import settings
genai.configure(api_key=settings.GEMINI_API_KEY)

def analyze_fit(resume_text: str, jd_text: str):
    model = genai.GenerativeModel('gemini-2.5-flash')

    prompt = f"""
    Act as a Senior Technical Recruiter. Analyze this resume against the job description.
    
    JOB DESCRIPTION:
    {jd_text}
    
    RESUME:
    {resume_text[:4000]}...
    
    Output strictly VALID JSON. Do not include markdown (```json).
    Structure:
    {{
        "candidate_name": "Extract Name",
        "match_score": (integer 0-100),
        "summary": "Two sentence reasoning.",
        "strengths": ["skill1", "skill2"],
        "missing_skills": ["skill1", "skill2"],
        "experience_years": (numeric)
    }}
    """

    try:
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        return json.loads(response.text)
        
    except Exception as e:
        print(f"Gemini Error: {e}")
        return {
            "candidate_name": "Error Analyzing",
            "match_score": 0,
            "summary": "Could not process resume with Gemini.",
            "strengths": [],
            "missing_skills": [],
            "experience_years": 0
        }