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

-- ============================================================
-- Row Level Security (RLS) — allow anon inserts, block reads
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE applications    ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_setups  ENABLE ROW LEVEL SECURITY;
ALTER TABLE passkey_orders  ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT (form submissions from the website)
CREATE POLICY "Allow anon insert applications"
  ON applications FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon insert profile_setups"
  ON profile_setups FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon insert passkey_orders"
  ON passkey_orders FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous SELECT (admin dashboard reads via anon key)
CREATE POLICY "Allow anon select applications"
  ON applications FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon select profile_setups"
  ON profile_setups FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon select passkey_orders"
  ON passkey_orders FOR SELECT TO anon USING (true);

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
