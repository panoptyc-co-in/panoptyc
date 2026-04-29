from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any, Optional
from datetime import datetime
import os
import uuid
from supabase import create_client, Client

router = APIRouter()

# Initialize Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")
supabase: Optional[Client] = None

if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception:
        supabase = None


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


class AdminLoginForm(BaseModel):
    password: str


BASE_DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))
TMP_DATA_DIR = "/tmp/panoptyc-data"


def _storage_name(file_name_or_path: str) -> str:
    return os.path.basename(file_name_or_path)


def _storage_read_paths(file_name_or_path: str):
    name = _storage_name(file_name_or_path)
    return [
        os.path.join(TMP_DATA_DIR, name),
        os.path.join(BASE_DATA_DIR, name),
    ]


def _storage_write_path(file_name_or_path: str) -> str:
    name = _storage_name(file_name_or_path)
    primary = os.path.join(BASE_DATA_DIR, name)

    try:
        os.makedirs(BASE_DATA_DIR, exist_ok=True)
        if os.access(BASE_DATA_DIR, os.W_OK):
            return primary
    except Exception:
        pass

    os.makedirs(TMP_DATA_DIR, exist_ok=True)
    return os.path.join(TMP_DATA_DIR, name)


def _load_json_list(file_name_or_path: str):
    import json

    for path in _storage_read_paths(file_name_or_path):
        if not os.path.exists(path):
            continue
        with open(path, "r") as f:
            try:
                data = json.load(f)
                if isinstance(data, list):
                    return data
            except Exception:
                continue
    return []


def _load_json_dict(file_name_or_path: str, default=None):
    import json

    if default is None:
        default = {}

    for path in _storage_read_paths(file_name_or_path):
        if not os.path.exists(path):
            continue
        with open(path, "r") as f:
            try:
                data = json.load(f)
                if isinstance(data, dict):
                    return data
            except Exception:
                continue
    return default


def _save_json_list(file_name_or_path: str, rows):
    import json

    path = _storage_write_path(file_name_or_path)
    try:
        with open(path, "w") as f:
            json.dump(rows, f, indent=4)
    except OSError:
        fallback = os.path.join(TMP_DATA_DIR, _storage_name(file_name_or_path))
        os.makedirs(TMP_DATA_DIR, exist_ok=True)
        with open(fallback, "w") as f:
            json.dump(rows, f, indent=4)


def _save_json_dict(file_name_or_path: str, payload):
    import json

    path = _storage_write_path(file_name_or_path)
    try:
        with open(path, "w") as f:
            json.dump(payload, f, indent=4)
    except OSError:
        fallback = os.path.join(TMP_DATA_DIR, _storage_name(file_name_or_path))
        os.makedirs(TMP_DATA_DIR, exist_ok=True)
        with open(fallback, "w") as f:
            json.dump(payload, f, indent=4)


def _complete_profile_to_db(row: dict):
    return {
        "first_name": row.get("firstName", ""),
        "last_name": row.get("lastName", ""),
        "email": row.get("email", ""),
        "mobile": row.get("mobile", ""),
        "address": row.get("address", ""),
        "education": row.get("education", ""),
        "photo": row.get("photo", "") or "",
        "employee_code": row.get("employeeCode", ""),
        "signature": row.get("signature", "") or "",
        "terms_agreed": bool(row.get("termsAgreed", False)),
    }


def _complete_profile_from_db(row: dict):
    return {
        "id": row.get("id", ""),
        "firstName": row.get("first_name", ""),
        "lastName": row.get("last_name", ""),
        "email": row.get("email", ""),
        "mobile": row.get("mobile", ""),
        "address": row.get("address", ""),
        "education": row.get("education", ""),
        "photo": row.get("photo", "") or "",
        "employeeCode": row.get("employee_code", ""),
        "signature": row.get("signature", "") or "",
        "termsAgreed": bool(row.get("terms_agreed", False)),
        "created_at": row.get("created_at", ""),
    }


def _merge_complete_profiles(local_rows, remote_rows):
    merged = {}
    for row in local_rows + remote_rows:
        key = str(row.get("employeeCode") or row.get("email") or row.get("id") or uuid.uuid4())
        existing = merged.get(key, {})
        merged[key] = {**existing, **row}

    deleted_data = _load_json_dict("deleted_records.json", {})
    deleted_emails = {
        str(item).strip().lower()
        for item in deleted_data.get("profile_setups", [])
    }

    rows = [
        row
        for row in merged.values()
        if str(row.get("email", "")).strip().lower() not in deleted_emails
    ]
    rows.sort(key=lambda item: str(item.get("created_at") or ""), reverse=True)
    return rows


def _load_complete_profiles():
    local_rows = _load_json_list("complete_profiles.json")
    remote_rows = []

    if supabase is not None:
        try:
            result = supabase.table("complete_profiles").select("*").order("created_at", desc=True).execute()
            remote_rows = [_complete_profile_from_db(row) for row in (result.data or [])]
        except Exception:
            remote_rows = []

    return _merge_complete_profiles(local_rows, remote_rows)


def _upsert_local_complete_profile(entry: dict):
    data_list = _load_json_list("complete_profiles.json")
    employee_code = entry.get("employeeCode")
    email = str(entry.get("email", "")).strip().lower()

    existing_index = next(
        (
            i
            for i, item in enumerate(data_list)
            if (
                employee_code
                and item.get("employeeCode") == employee_code
            )
            or (
                email
                and str(item.get("email", "")).strip().lower() == email
            )
        ),
        -1,
    )

    if existing_index >= 0:
        data_list[existing_index] = entry
    else:
        data_list.append(entry)

    _save_json_list("complete_profiles.json", data_list)


# ---------- Submit Application ----------

@router.post("/api/submit-application")
async def submit_application(form: ApplicationForm):
    """Save application form data to Supabase"""
    try:
        data = {
            "full_name": form.fullName,
            "phone": form.phone,
            "email": form.email or "",
            "city": form.city,
        }

        result = None
        if supabase is not None:
            try:
                result = supabase.table("applications").insert(data).execute()
            except Exception as err:
                # Some deployed projects were created without applications.email column.
                # Fallback keeps submissions working while we persist email locally for admin view.
                message = str(err)
                if "applications" in message and "email" in message and "column" in message:
                    try:
                        result = supabase.table("applications").insert({
                            "full_name": form.fullName,
                            "phone": form.phone,
                            "city": form.city,
                        }).execute()
                    except Exception:
                        result = None
                else:
                    # Keep local backup working even when Supabase insert fails.
                    result = None

        created_at = datetime.now().isoformat()
        app_id = str(uuid.uuid4())
        if result and getattr(result, "data", None):
            row = result.data[0] if result.data else {}
            if row.get("id"):
                app_id = str(row.get("id"))
            if row.get("created_at"):
                created_at = row.get("created_at")

        apps = _load_json_list("applications.json")

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

        _save_json_list("applications.json", apps)

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


@router.post("/api/admin-login")
async def admin_login(form: AdminLoginForm):
    """Validate admin password server-side for production-safe login."""
    configured = os.environ.get("ADMIN_PASSWORD") or os.environ.get("REACT_APP_ADMIN_PASSWORD") or "panoptyc@admin$123"
    valid_values = {configured, configured.replace("\\$", "$")}

    if form.password in valid_values:
        return {"success": True}

    raise HTTPException(status_code=401, detail="Invalid password")


@router.get("/api/applications")
async def get_applications():
    """Return applications merged with locally stored email data."""
    try:
        local_apps = _load_json_list("applications.json")

        deleted_ids = set()
        deleted_data = _load_json_dict("deleted_records.json", {})
        deleted_ids = set(str(item) for item in deleted_data.get("applications", []))

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
        # 1. Verify credentials from Supabase profile_setups table
        records = []
        if supabase is not None:
            result = supabase.table("profile_setups").select("*").eq("email", form.email).execute()
            records = result.data or []

        match = next((r for r in records if r.get("password") == form.password), None)
        if not match:
            raise HTTPException(status_code=401, detail="Invalid email or password.")

        # Check if email is disabled (deleted)
        del_data = _load_json_dict("deleted_records.json", {})
        if form.email in del_data.get("profile_setups", []):
            raise HTTPException(status_code=401, detail="Account has been disabled or removed.")

        # 2. Look up complete profile to get employeeCode
        employee_code = None
        first_name = ""
        last_name = ""
        mobile = ""
        address = ""
        education = ""
        photo = ""
        profiles = _load_complete_profiles()
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
        if supabase is None:
            raise HTTPException(status_code=503, detail="Supabase is not configured")

        data = {
            "email": form.email,
            "password": form.password,
        }
        supabase.table("profile_setups").insert(data).execute()
        return {"success": True, "message": "Account credentials saved."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save credentials: {str(e)}")


# ---------- Submit Complete Profile ----------

@router.post("/api/submit-complete-profile")
async def submit_complete_profile(form: CompleteProfileForm):
    """Save complete profile form data to Supabase with local JSON fallback."""
    try:
        new_entry = form.model_dump() if hasattr(form, "model_dump") else form.dict()
        new_entry["email"] = new_entry.get("email", "").strip()
        new_entry["employeeCode"] = new_entry.get("employeeCode", "").strip().upper()
        new_entry["created_at"] = datetime.now().isoformat()

        if supabase is not None:
            try:
                supabase.table("complete_profiles").insert(_complete_profile_to_db(new_entry)).execute()
            except Exception:
                # Keep registration working if the Supabase table is missing or temporarily unavailable.
                pass

        _upsert_local_complete_profile(new_entry)

        return {"success": True, "message": "Profile details saved successfully!", "employeeCode": form.employeeCode}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save complete profile: {str(e)}")

@router.get("/api/complete-profiles")
async def get_complete_profiles():
    """Get all complete profiles from Supabase merged with local fallback data."""
    try:
        return _load_complete_profiles()
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
        tab = (req.tab or "").strip()
        if tab not in ["applications", "passkey_orders", "complete_profiles"]:
            raise HTTPException(status_code=400, detail="Invalid tab for delete request")

        deleted_data = _load_json_dict("deleted_records.json", {"applications": [], "passkey_orders": [], "profile_setups": []})

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
                    apps = _load_json_list("applications.json")
                    apps = [item for item in apps if str(item.get("id")) != record_id]
                    _save_json_list("applications.json", apps)
        elif tab == "complete_profiles":
            data_list = _load_json_list("complete_profiles.json")
            if data_list:
                
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

                if supabase is not None:
                    try:
                        if req.employeeCode:
                            supabase.table("complete_profiles").delete().eq("employee_code", req.employeeCode).execute()
                        elif target_email:
                            supabase.table("complete_profiles").delete().eq("email", target_email).execute()
                    except:
                        pass

                if req.employeeCode:
                    data_list = [d for d in data_list if d.get("employeeCode") != req.employeeCode]
                elif target_email:
                    data_list = [d for d in data_list if d.get("email") != target_email]

                _save_json_list("complete_profiles.json", data_list)

        _save_json_dict("deleted_records.json", deleted_data)
        return {"success": True, "message": "Record deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete record: {str(e)}")

@router.get("/api/deleted-records")
async def get_deleted_records():
    return _load_json_dict("deleted_records.json", {})


# ---------- Employee Login by Code ----------

@router.post("/api/employee-login-code")
async def employee_login_by_code(form: EmployeeLoginCodeForm):
    """Validate employee login using their unique employee code"""
    try:
        data_list = _load_json_list("complete_profiles.json")

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
        local_path = os.path.join(os.path.dirname(__file__), "..", "data", "passkey_orders.json")

        if supabase is None:
            rows = _load_json_list(local_path)
            rows.sort(key=lambda item: str(item.get("created_at") or ""), reverse=True)
            return rows

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

        if supabase is not None:
            try:
                supabase.table("passkey_orders").insert(data).execute()
            except Exception:
                local_path = os.path.join(os.path.dirname(__file__), "..", "data", "passkey_orders.json")
                rows = _load_json_list(local_path)
                rows.append({
                    "id": str(uuid.uuid4()),
                    **data,
                    "created_at": datetime.now().isoformat(),
                })
                _save_json_list(local_path, rows)
        else:
            local_path = os.path.join(os.path.dirname(__file__), "..", "data", "passkey_orders.json")
            rows = _load_json_list(local_path)
            rows.append({
                "id": str(uuid.uuid4()),
                **data,
                "created_at": datetime.now().isoformat(),
            })
            _save_json_list(local_path, rows)

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
