# 🦷 Dr. Dania Awwad Dental Clinic

موقع عيادة د. دانيا عوض لطب الأسنان التجميلي والزراعة

## Features
- Landing page with services, reviews, and clinic info
- Online booking system with real-time slot availability
- Full admin dashboard with charts, calendar, and patient management
- Supabase backend for persistent data storage

## Setup

### 1. Supabase
- Go to your Supabase project SQL Editor
- Run the contents of `supabase-migration.sql`

### 2. Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Run Locally
```bash
npm install
npm run dev
```

### 4. Deploy to Vercel
Push to GitHub, then import in Vercel. Add env vars in Vercel project settings.

## Admin Login
- Username: `admin`
- Password: `admin123`
