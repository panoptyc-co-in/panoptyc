from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
import os
from supabase import create_client, Client

router = APIRouter()

# Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# ---------- Pydantic Models ----------

class ApplicationForm(BaseModel):
    fullName: str
    phone: str
    city: str


class ProfileSetupForm(BaseModel):
    email: str
    password: str


class PasskeyOrderForm(BaseModel):
    fullName: str
    phone: str
    addressLine1: str
    addressLine2: str = ""
    city: str
    state: str
    pincode: str
    quantity: int = 1


# ---------- Submit Application ----------

@router.post("/api/submit-application")
async def submit_application(form: ApplicationForm):
    """Save application form data to Supabase"""
    try:
        data = {
            "full_name": form.fullName,
            "phone": form.phone,
            "city": form.city,
        }
        result = supabase.table("applications").insert(data).execute()

        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return {
            "success": True,
            "message": "Application submitted successfully!",
            "data": {
                "fullName": form.fullName,
                "timestamp": timestamp,
            },
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save application: {str(e)}")


# ---------- Submit Profile Setup ----------

@router.post("/api/submit-profile-setup")
async def submit_profile_setup(form: ProfileSetupForm):
    """Save profile setup form data to Supabase"""
    try:
        data = {
            "email": form.email,
            "password": form.password,
        }
        result = supabase.table("profile_setups").insert(data).execute()

        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return {
            "success": True,
            "message": "Profile setup submitted successfully!",
            "data": {
                "email": form.email,
                "timestamp": timestamp,
            },
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save profile setup: {str(e)}")


# ---------- Submit Passkey Order ----------

@router.post("/api/submit-passkey-order")
async def submit_passkey_order(form: PasskeyOrderForm):
    """Save passkey order form data to Supabase"""
    try:
        data = {
            "full_name": form.fullName,
            "phone": form.phone,
            "address_line1": form.addressLine1,
            "address_line2": form.addressLine2,
            "city": form.city,
            "state": form.state,
            "pincode": form.pincode,
            "quantity": form.quantity,
        }
        result = supabase.table("passkey_orders").insert(data).execute()

        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return {
            "success": True,
            "message": "Order placed successfully!",
            "data": {
                "fullName": form.fullName,
                "timestamp": timestamp,
            },
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save order: {str(e)}")
