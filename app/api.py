from cgitb import handler
from http.client import HTTPException
import string
from app import MAX_INPUT_LENGTH
from fastapi import FastAPI
from app import generate_branding_snippet, generate_keywords
from mangum import Mangum


app = FastAPI()

handler = Mangum(app)

MAX_INPUT_LENGTH = 32

#we need a handler function for lambda to call to kickstart this


@app.get("/generate_snippet")
async def generate_snippet(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": f"{snippet}"}


@app.get("/generate_keyword")
async def generate_keyword(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"keywords": f"{keywords}"}


@app.get("/generate_snippet_and_keywords")
async def generate_snippet_and_keywords(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": f"{snippet}", "keywords":f"{keywords}"}

# @uvicorn api:app --reload

def validate_input_length(prompt: str):
    if(len(prompt) > MAX_INPUT_LENGTH):
        raise HTTPException(status_code=400,
        detail=f"Input length is too long, keep it under {MAX_INPUT_LENGTH} characters!")
        

