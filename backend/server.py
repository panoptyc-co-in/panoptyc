from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Health Check ----------

@api_router.get("/")
async def root():
    return {"message": "Panoptyc API is running"}


# ---------- Include Form Routes ----------
from routes.forms import router as forms_router

app.include_router(api_router)
app.include_router(forms_router)

cors_origins = [
    origin.strip()
    for origin in os.environ.get('CORS_ORIGINS', '').split(',')
    if origin.strip()
]
cors_allow_credentials = os.environ.get('CORS_ALLOW_CREDENTIALS', 'false').lower() == 'true'
raw_cors_origin_regex = os.environ.get('CORS_ORIGIN_REGEX')
cors_origin_regex = (
    raw_cors_origin_regex
    if raw_cors_origin_regex is not None
    else r'https://.*\.trycloudflare\.com|http://localhost(:\d+)?|http://127\.0\.0\.1(:\d+)?'
)

if raw_cors_origin_regex == '':
    cors_origin_regex = None

app.add_middleware(
    CORSMiddleware,
    allow_credentials=cors_allow_credentials,
    allow_origins=cors_origins,
    allow_origin_regex=cors_origin_regex,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)