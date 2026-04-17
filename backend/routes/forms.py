from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any
from datetime import datetime
import os
import uuid
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
    email: str = ""


class ProfileSetupForm(BaseModel):
    email: str
    password: str

class CompleteProfileForm(BaseModel):
    firstName: str
    lastName: str
    email: str
    mobile: str
    address: str
    education: str
    photo: str = ""
    employeeCode: str = ""
    signature: str = ""
    termsAgreed: bool = False

class EmployeeLoginCodeForm(BaseModel):
    employeeCode: str

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
        import json

        data = {
            "full_name": form.fullName,
            "phone": form.phone,
            "email": form.email or "",
            "city": form.city,
        }

        result = None
        try:
            result = supabase.table("applications").insert(data).execute()
        except Exception as err:
            # Some deployed projects were created without applications.email column.
            # Fallback keeps submissions working while we persist email locally for admin view.
            message = str(err)
            if "applications" in message and "email" in message and "column" in message:
                result = supabase.table("applications").insert({
                    "full_name": form.fullName,
                    "phone": form.phone,
                    "city": form.city,
                }).execute()
            else:
                raise

        created_at = datetime.now().isoformat()
        app_id = str(uuid.uuid4())
        if result and getattr(result, "data", None):
            row = result.data[0] if result.data else {}
            if row.get("id"):
                app_id = str(row.get("id"))
            if row.get("created_at"):
                created_at = row.get("created_at")

        apps_path = os.path.join(os.path.dirname(__file__), "..", "data", "applications.json")
        apps = []
        if os.path.exists(apps_path):
            with open(apps_path, "r") as f:
                try:
                    apps = json.load(f)
                except Exception:
                    apps = []

        entry = {
            "id": app_id,
            "full_name": form.fullName,
            "phone": form.phone,
            "email": form.email or "",
            "city": form.city,
            "created_at": created_at,
        }

        existing_index = next((i for i, item in enumerate(apps) if str(item.get("id")) == app_id), -1)
        if existing_index >= 0:
            apps[existing_index] = entry
        else:
            apps.append(entry)

        with open(apps_path, "w") as f:
            json.dump(apps, f, indent=4)

        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return {
            "success": True,
            "message": "Application submitted successfully!",
            "data": {
                "id": app_id,
                "fullName": form.fullName,
                "timestamp": timestamp,
            },
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save application: {str(e)}")


@router.get("/api/applications")
async def get_applications():
    """Return applications merged with locally stored email data."""
    try:
        import json

        apps_path = os.path.join(os.path.dirname(__file__), "..", "data", "applications.json")
        deleted_path = os.path.join(os.path.dirname(__file__), "..", "data", "deleted_records.json")

        local_apps = []
        if os.path.exists(apps_path):
            with open(apps_path, "r") as f:
                try:
                    local_apps = json.load(f)
                except Exception:
                    local_apps = []

        deleted_ids = set()
        if os.path.exists(deleted_path):
            with open(deleted_path, "r") as f:
                try:
                    deleted_data = json.load(f)
                    deleted_ids = set(str(item) for item in deleted_data.get("applications", []))
                except Exception:
                    deleted_ids = set()

        local_by_id = {str(item.get("id")): item for item in local_apps if item.get("id")}
        merged = {}

        try:
            sb_result = supabase.table("applications").select("*").order("created_at", desc=True).execute()
            sb_rows = sb_result.data or []
        except Exception:
            sb_rows = []

        for row in sb_rows:
            row_id = str(row.get("id") or "")
            if not row_id:
                continue
            local = local_by_id.get(row_id, {})
            merged[row_id] = {
                **row,
                "email": row.get("email") or local.get("email", ""),
            }

        for local in local_apps:
            row_id = str(local.get("id") or "")
            if not row_id:
                continue
            if row_id in merged:
                if not merged[row_id].get("email"):
                    merged[row_id]["email"] = local.get("email", "")
            else:
                merged[row_id] = local

        rows = [row for row_id, row in merged.items() if row_id not in deleted_ids]
        rows.sort(key=lambda item: str(item.get("created_at") or ""), reverse=True)
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load applications: {str(e)}")


# ---------- Submit Profile Setup ----------

@router.post("/api/employee-login")
async def employee_login(form: ProfileSetupForm):
    """Login employee with email + password, return employee code if registered"""
    try:
        import json

        # 1. Verify credentials from Supabase profile_setups table
        result = supabase.table("profile_setups").select("*").eq("email", form.email).execute()
        records = result.data or []

        match = next((r for r in records if r.get("password") == form.password), None)
        if not match:
            raise HTTPException(status_code=401, detail="Invalid email or password.")

        # Check if email is disabled (deleted)
        del_file = os.path.join(os.path.dirname(__file__), "..", "data", "deleted_records.json")
        if os.path.exists(del_file):
            try:
                with open(del_file, "r") as f:
                    del_data = json.load(f)
                if form.email in del_data.get("profile_setups", []):
                    raise HTTPException(status_code=401, detail="Account has been disabled or removed.")
            except:
                pass

        # 2. Look up complete profile to get employeeCode
        file_path = os.path.join(os.path.dirname(__file__), "..", "data", "complete_profiles.json")
        employee_code = None
        first_name = ""
        last_name = ""
        mobile = ""
        address = ""
        education = ""
        photo = ""
        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                try:
                    profiles = json.load(f)
                except json.JSONDecodeError:
                    profiles = []
            emp = next((p for p in profiles if p.get("email") == form.email), None)
            if emp:
                employee_code = emp.get("employeeCode", "")
                first_name = emp.get("firstName", "")
                last_name = emp.get("lastName", "")
                mobile = emp.get("mobile", "")
                address = emp.get("address", "")
                education = emp.get("education", "")
                photo = emp.get("photo", "")

        return {
            "success": True,
            "message": f"Welcome back, {first_name}!",
            "employee": {
                "firstName": first_name,
                "lastName": last_name,
                "email": form.email,
                "mobile": mobile,
                "address": address,
                "education": education,
                "photo": photo,
                "employeeCode": employee_code,
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")


# ---------- Submit Profile Setup (save credentials) ----------

@router.post("/api/submit-profile-setup")
async def submit_profile_setup(form: ProfileSetupForm):
    """Save profile setup credentials to Supabase"""
    try:
        data = {
            "email": form.email,
            "password": form.password,
        }
        supabase.table("profile_setups").insert(data).execute()
        return {"success": True, "message": "Account credentials saved."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save credentials: {str(e)}")


# ---------- Submit Complete Profile ----------

@router.post("/api/submit-complete-profile")
async def submit_complete_profile(form: CompleteProfileForm):
    """Save complete profile form data to local JSON"""
    try:
        import json
        file_path = os.path.join(os.path.dirname(__file__), "..", "data", "complete_profiles.json")
        data_list = []
        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                try:
                    data_list = json.load(f)
                except json.JSONDecodeError:
                    data_list = []
                    
        new_entry = form.dict()
        new_entry["created_at"] = datetime.now().isoformat()
        data_list.append(new_entry)
        
        with open(file_path, "w") as f:
            json.dump(data_list, f, indent=4)
            
        return {"success": True, "message": "Profile details saved successfully!", "employeeCode": form.employeeCode}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save complete profile: {str(e)}")

@router.get("/api/complete-profiles")
async def get_complete_profiles():
    """Get all complete profiles from JSON"""
    try:
        import json
        file_path = os.path.join(os.path.dirname(__file__), "..", "data", "complete_profiles.json")
        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                try:
                    return json.load(f)
                except json.JSONDecodeError:
                    return []
        return []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------- Delete Record ----------

class DeleteRecordForm(BaseModel):
    tab: str
    id: Any = None
    employeeCode: str = ""
    email: str = ""

@router.api_route("/api/delete-record", methods=["DELETE", "POST"])
async def delete_record(req: DeleteRecordForm):
    try:
        import json
        tab = (req.tab or "").strip()
        if tab not in ["applications", "passkey_orders", "complete_profiles"]:
            raise HTTPException(status_code=400, detail="Invalid tab for delete request")

        file_path = os.path.join(os.path.dirname(__file__), "..", "data", "deleted_records.json")
        deleted_data = {"applications": [], "passkey_orders": [], "profile_setups": []}
        if os.path.exists(file_path):
            try:
                with open(file_path, "r") as f:
                    deleted_data = json.load(f)
            except:
                pass

        if tab in ["applications", "passkey_orders"]:
            if req.id is not None:
                record_id = str(req.id)
                if record_id not in deleted_data.get(tab, []):
                    if tab not in deleted_data:
                        deleted_data[tab] = []
                    deleted_data[tab].append(record_id)
                try:
                    supabase.table(tab).delete().eq("id", req.id).execute()
                except:
                    # If Supabase deletion is blocked by policy, still hide from admin using deleted_records.
                    pass

                if tab == "applications":
                    apps_path = os.path.join(os.path.dirname(__file__), "..", "data", "applications.json")
                    if os.path.exists(apps_path):
                        with open(apps_path, "r") as f:
                            try:
                                apps = json.load(f)
                            except Exception:
                                apps = []
                        apps = [item for item in apps if str(item.get("id")) != record_id]
                        with open(apps_path, "w") as f:
                            json.dump(apps, f, indent=4)
        elif tab == "complete_profiles":
            cp_path = os.path.join(os.path.dirname(__file__), "..", "data", "complete_profiles.json")
            if os.path.exists(cp_path):
                with open(cp_path, "r") as f:
                    try:
                        data_list = json.load(f)
                    except json.JSONDecodeError:
                        data_list = []
                
                target_email = req.email
                if not target_email:
                    target_row = next((r for r in data_list if r.get("employeeCode") == req.employeeCode), None)
                    if target_row:
                        target_email = target_row.get("email", "")
                
                if target_email and target_email not in deleted_data.get("profile_setups", []):
                    deleted_data["profile_setups"].append(target_email)

                if target_email:
                    try:
                        supabase.table("profile_setups").delete().eq("email", target_email).execute()
                    except:
                        pass

                if req.employeeCode:
                    data_list = [d for d in data_list if d.get("employeeCode") != req.employeeCode]
                elif target_email:
                    data_list = [d for d in data_list if d.get("email") != target_email]

                with open(cp_path, "w") as f:
                    json.dump(data_list, f, indent=4)

        with open(file_path, "w") as f:
            json.dump(deleted_data, f, indent=4)
        return {"success": True, "message": "Record deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete record: {str(e)}")

@router.get("/api/deleted-records")
async def get_deleted_records():
    import json
    file_path = os.path.join(os.path.dirname(__file__), "..", "data", "deleted_records.json")
    if os.path.exists(file_path):
        try:
            with open(file_path, "r") as f:
                return json.load(f)
        except:
            return {}
    return {}


# ---------- Employee Login by Code ----------

@router.post("/api/employee-login-code")
async def employee_login_by_code(form: EmployeeLoginCodeForm):
    """Validate employee login using their unique employee code"""
    try:
        import json
        file_path = os.path.join(os.path.dirname(__file__), "..", "data", "complete_profiles.json")
        data_list = []
        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                try:
                    data_list = json.load(f)
                except json.JSONDecodeError:
                    data_list = []

        # Search for matching employee code
        employee = next((e for e in data_list if e.get("employeeCode") == form.employeeCode.strip().upper()), None)

        if employee:
            return {
                "success": True,
                "message": f"Welcome back, {employee.get('firstName', '')}!",
                "employee": {
                    "firstName": employee.get("firstName", ""),
                    "lastName": employee.get("lastName", ""),
                    "email": employee.get("email", ""),
                    "employeeCode": employee.get("employeeCode", ""),
                }
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid Employee Code. Please check and try again.")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------- Submit Passkey Order ----------

@router.get("/api/passkey-orders")
async def get_passkey_orders():
    """Get passkey orders from Supabase for admin dashboard."""
    try:
        result = supabase.table("passkey_orders").select("*").order("created_at", desc=True).execute()
        return result.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load passkey orders: {str(e)}")

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
