from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import meetings
from app.db.session import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Scaler Meetings API",
    description="Zoom-inspired Video Conferencing Platform API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(meetings.router, prefix="/api/meetings", tags=["meetings"])

@app.get("/")
def root():
    return {"message": "Scaler Meetings API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}