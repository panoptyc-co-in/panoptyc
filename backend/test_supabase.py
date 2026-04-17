import os
from supabase import create_client

from dotenv import load_dotenv
load_dotenv(".env")

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
res = supabase.table("profile_setups").select("*").limit(1).execute()
print(res.data)
