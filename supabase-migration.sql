-- ============================================
-- Supabase Migration: Dental Clinic Database
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- 1. Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Allow anyone to INSERT (for booking)
CREATE POLICY "Allow public insert" ON public.appointments
  FOR INSERT WITH CHECK (true);

-- Allow anyone to SELECT (for checking booked slots)
CREATE POLICY "Allow public select" ON public.appointments
  FOR SELECT USING (true);

-- Allow service role to UPDATE (for admin status changes)
CREATE POLICY "Allow service update" ON public.appointments
  FOR UPDATE USING (true) WITH CHECK (true);

-- 4. Create indexes for performance
CREATE INDEX idx_appointments_date ON public.appointments (date);
CREATE INDEX idx_appointments_status ON public.appointments (status);
CREATE INDEX idx_appointments_phone ON public.appointments (phone);

-- 5. Insert sample data
INSERT INTO public.appointments (name, phone, service, date, time, status) VALUES
  ('أحمد محمد', '0791234567', 'زراعة الأسنان', '2026-03-16', '09:00', 'confirmed'),
  ('سارة خالد', '0797654321', 'تجميل الأسنان', '2026-03-16', '10:30', 'confirmed'),
  ('محمد علي', '0781112233', 'تبييض الأسنان', '2026-03-17', '14:00', 'pending'),
  ('ليلى أحمد', '0789998877', 'العلاج التحفظي', '2026-03-17', '11:00', 'confirmed'),
  ('عمر حسن', '0776665544', 'التركيبات والتيجان', '2026-03-18', '09:30', 'cancelled'),
  ('نور الدين', '0782223344', 'البوتكس التجميلي', '2026-03-18', '15:00', 'confirmed'),
  ('رانيا سمير', '0795556677', 'زراعة الأسنان', '2026-03-19', '10:00', 'pending'),
  ('كريم وليد', '0788889900', 'تجميل الأسنان', '2026-03-19', '16:00', 'confirmed'),
  ('فاطمة يوسف', '0771234567', 'العلاج التحفظي', '2026-03-20', '09:00', 'confirmed'),
  ('طارق عبدالله', '0794321567', 'تبييض الأسنان', '2026-03-20', '14:30', 'pending'),
  ('هدى نبيل', '0786543210', 'زراعة الأسنان', '2026-03-15', '10:00', 'completed'),
  ('ياسر فريد', '0779876543', 'التركيبات والتيجان', '2026-03-15', '11:30', 'completed'),
  ('منى عادل', '0791122334', 'تجميل الأسنان', '2026-03-14', '09:30', 'completed'),
  ('باسم ناصر', '0783344556', 'البوتكس التجميلي', '2026-03-14', '15:30', 'completed'),
  ('ديما رائد', '0796677889', 'تبييض الأسنان', '2026-03-13', '14:00', 'completed');
