
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="24-7 Solutions API")


origins = [
    "http://localhost:5173",    
    "https://opuscode.dev",       
    "https://www.opuscode.dev"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextPayload(BaseModel):
    text: str

# --- Routes ---
@app.get("/")
async def get_root():
    return {"message": "Hello from the FastAPI Root!"}

@app.post("/test")
async def post_test(payload: TextPayload):
    return {"message": f"Server successfully received: '{payload.text}'"}

