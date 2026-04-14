# Excel Form Submissions

## Overview
All form submissions from the website are automatically saved to Excel files with timestamps.

## Excel File Locations

### 1. Applications (Apply Now Form)
**File Location:** `/app/backend/data/applications.xlsx`

**Columns:**
- Timestamp (Date & Time of submission)
- Full Name
- Phone Number
- City

**Example:**
```
Timestamp              | Full Name  | Phone Number      | City
2026-04-14 16:56:13   | John Doe   | 9876543210        | Delhi
```

### 2. Profile Setup Forms
**File Location:** `/app/backend/data/profile_setup.xlsx`

**Columns:**
- Timestamp (Date & Time of submission)
- Email
- Password

**Example:**
```
Timestamp              | Email                    | Password
2026-04-14 16:56:43   | jane.smith@example.com   | SecurePass123
```

## How to Access Excel Files

### Method 1: Download from Server
The Excel files are stored on the server at `/app/backend/data/`. You can:
1. Use FTP/SFTP to download the files
2. Use the backend API endpoints (see below)

### Method 2: API Endpoints

**Get Applications File Location:**
```bash
GET /api/download-applications
```

**Get Profile Setup File Location:**
```bash
GET /api/download-profile-setups
```

## Features

✅ **Automatic Creation:** Excel files are created automatically on first submission
✅ **Continuous Append:** New submissions are added to the same file (no overwriting)
✅ **Timestamps:** Every submission includes date and time
✅ **Headers:** Files have clear column headers
✅ **Format:** Standard Excel (.xlsx) format - opens in Microsoft Excel, Google Sheets, LibreOffice, etc.

## Data Flow

```
User fills form → Frontend validation → POST to Backend API → Save to Excel → Success message
```

1. **Apply Now Form** → `/api/submit-application` → `applications.xlsx`
2. **Profile Setup Form** → `/api/submit-profile-setup` → `profile_setup.xlsx`

## Notes

- All submissions are saved immediately upon form submission
- Excel files are persistent and will grow with each submission
- No database required - pure Excel storage
- Files can be opened directly with Excel or imported into any database
- Timestamps are in `YYYY-MM-DD HH:MM:SS` format

## Security Reminder

⚠️ **Important:** The Profile Setup file contains passwords in plain text. Consider:
- Restricting access to the Excel files
- Implementing password hashing if this is for production use
- Keeping the `/app/backend/data/` directory secure

## File Permissions

Current permissions: Read/Write for server process
Location: `/app/backend/data/`
- `applications.xlsx`
- `profile_setup.xlsx`
