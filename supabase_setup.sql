-- ============================================================
-- Panoptyc Admin Dashboard — Supabase Table Setup
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/pyvneilwqiuowehvmwmj/sql/new
-- ============================================================

-- Table 1: Applications (Apply Now form)
CREATE TABLE IF NOT EXISTS applications (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name   TEXT        NOT NULL,
  phone       TEXT        NOT NULL,
  email       TEXT        DEFAULT '',
  city        TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Table 2: Profile Setups (Login form submissions)
CREATE TABLE IF NOT EXISTS profile_setups (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT        NOT NULL,
  password    TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Table 3: Passkey Orders (YubiKey order form)
CREATE TABLE IF NOT EXISTS passkey_orders (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name     TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  address_line1 TEXT        NOT NULL,
  address_line2 TEXT        DEFAULT '',
  city          TEXT        NOT NULL,
  state         TEXT        NOT NULL,
  pincode       TEXT        NOT NULL,
  quantity      INTEGER     DEFAULT 1,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Table 4: Complete Profiles (completed employee registrations)
CREATE TABLE IF NOT EXISTS complete_profiles (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name     TEXT        NOT NULL,
  last_name      TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  mobile         TEXT        NOT NULL,
  address        TEXT        NOT NULL,
  education      TEXT        NOT NULL,
  photo          TEXT        DEFAULT '',
  employee_code  TEXT        NOT NULL,
  signature      TEXT        DEFAULT '',
  terms_agreed   BOOLEAN     DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS) — allow anon inserts, block reads
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE applications    ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_setups  ENABLE ROW LEVEL SECURITY;
ALTER TABLE passkey_orders  ENABLE ROW LEVEL SECURITY;
ALTER TABLE complete_profiles ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT (form submissions from the website)
CREATE POLICY "Allow anon insert applications"
  ON applications FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon insert profile_setups"
  ON profile_setups FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon insert passkey_orders"
  ON passkey_orders FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon insert complete_profiles"
  ON complete_profiles FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous SELECT (admin dashboard reads via anon key)
CREATE POLICY "Allow anon select applications"
  ON applications FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon select profile_setups"
  ON profile_setups FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon select passkey_orders"
  ON passkey_orders FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon select complete_profiles"
  ON complete_profiles FOR SELECT TO anon USING (true);

-- Allow admin delete calls from the backend anon client.
CREATE POLICY "Allow anon delete complete_profiles"
  ON complete_profiles FOR DELETE TO anon USING (true);

-- ============================================================
-- Existing Project Migration (Run once if table already exists)
-- ============================================================

-- Ensure applications.email exists for Apply form + admin dashboard.
ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS email TEXT DEFAULT '';

-- Normalize existing rows so admin always sees a string value.
UPDATE applications
SET email = ''
WHERE email IS NULL;

-- Ensure complete profile persistence exists in existing projects.
ALTER TABLE complete_profiles
  ADD COLUMN IF NOT EXISTS first_name TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS last_name TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS email TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS mobile TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS education TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS photo TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS employee_code TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS signature TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS terms_agreed BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
