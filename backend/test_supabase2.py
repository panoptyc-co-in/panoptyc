import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv(".env")
SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Wait, Supabase client may not allow querying information_schema directly via REST API if it's disabled.
# Let's try inserting a dummy record to a new table `complete_profiles`.
try:
    res = supabase.table("complete_profiles").select("*").limit(1).execute()
    print("complete_profiles exists!")
except Exception as e:
    print(e)

# Also let's just create a test insert for profile_setups to see what it accepts
try:
    res = supabase.table("profile_setups").insert({"email":"test@test.com", "first_name":"test"}).execute()
    print("profile_setups insert:", res.data)
except Exception as e:
    print("profile_setups error:", e)

