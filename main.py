from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

resume_storage = {}

class EnhanceRequest(BaseModel):
    section: str
    content: str

class ResumeRequest(BaseModel):
    resume: dict

@app.post("/ai-enhance")
def enhance_section(data: EnhanceRequest):
    return {"enhanced": f"Improved version of: {data.content}"}

@app.post("/save-resume")
def save_resume(data: ResumeRequest):
    resume_storage["resume"] = data.resume
    return {"status": "Resume saved successfully"}

@app.get("/get-resume")
def get_resume():
    return resume_storage.get("resume", {})