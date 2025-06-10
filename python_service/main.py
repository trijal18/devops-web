from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from modules.generate_mcqs import generate_summary, generate_questions
import tempfile
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate/")
async def process_pdf(file: UploadFile = File(...)):
    # Save file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        shutil.copyfileobj(file.file, tmp)
        temp_path = tmp.name

    try:
        summary = generate_summary(temp_path)
        mcqs = generate_questions(temp_path)
        return {
            "summary": summary,
            "mcqs": mcqs
        }
    except Exception as e:
        return {"error": str(e)}


@app.get("/")
def root():
    return {"message": "PDF → Gemini microservice is running"}
