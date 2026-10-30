-- ==============================================================================
-- INET UX/UI Gallery - Supabase Schema & Initial Data
-- ==============================================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  detailed_description TEXT,
  category TEXT NOT NULL,
  platform TEXT NOT NULL,
  duration TEXT,
  type TEXT,
  year INT DEFAULT 2026,
  featured BOOLEAN DEFAULT false,
  cover_image TEXT NOT NULL,
  screens JSONB DEFAULT '[]'::jsonb,
  tokens JSONB DEFAULT '{}'::jsonb,
  metrics JSONB DEFAULT '{"likes": 0, "views": 0, "rating": 5.0}'::jsonb,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Requests Table (Tickets)
CREATE TABLE IF NOT EXISTS public.requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_no TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  department TEXT,
  project_type TEXT,
  timeline TEXT,
  requester_name TEXT,
  requester_email TEXT,
  status TEXT DEFAULT 'SUBMITTED',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Favorites Table
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  client_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies
-- Projects: Public Read
CREATE POLICY "Public can view published projects" 
ON public.projects FOR SELECT 
TO anon, authenticated 
USING (true);

-- Requests: Public Insert (Anyone can submit a design request)
CREATE POLICY "Public can submit design requests" 
ON public.requests FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Public can read own requests" 
ON public.requests FOR SELECT 
TO anon, authenticated 
USING (true);

-- Favorites: Public Insert/Select
CREATE POLICY "Public can manage favorites" 
ON public.favorites FOR ALL 
TO anon, authenticated 
USING (true);

-- 6. Helper Functions for Likes
CREATE OR REPLACE FUNCTION increment_likes(project_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.projects
  SET metrics = jsonb_set(
    metrics, 
    '{likes}', 
    to_jsonb(COALESCE((metrics->>'likes')::int, 0) + 1)
  )
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_likes(project_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.projects
  SET metrics = jsonb_set(
    metrics, 
    '{likes}', 
    to_jsonb(GREATEST(0, COALESCE((metrics->>'likes')::int, 0) - 1))
  )
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;

-- 7. Seed Initial Projects (Figma 1:1 Data)
INSERT INTO public.projects (id, title, client, tagline, description, detailed_description, category, platform, duration, type, year, featured, cover_image, screens, tokens, metrics, tags)
VALUES
(
  'harvesta',
  'Harvesta',
  'AgriTech Solutions Co., Ltd.',
  'ระบบบริหารจัดการข้อมูลการเกษตรและตรวจเช็คอุปกรณ์ IoT ในแปลงปลูก',
  'แพลตฟอร์มจัดการข้อมูลการเกษตร ระบบบริหารจัดการข้อมูลทางการเกษตรที่ช่วยให้ผู้ใช้งานสามารถติดตามผลผลิต ตรวจสอบข้อมูลแปลงเพาะปลูก และวิเคราะห์ข้อมูลผ่าน Dashboard แบบเรียลไทม์ เพื่อช่วยเพิ่มประสิทธิภาพในการวางแผนและการตัดสินใจ',
  'ระบบบริหารจัดการแปลงเกษตรอัจฉริยะ ออกแบบระบบสถาปัตยกรรมข้อมูลให้เข้าใจง่ายสำหรับเกษตรกรยุคใหม่และผู้จัดการฟาร์มอุตสาหกรรม เชื่อมต่อข้อมูลเซนเซอร์ IoT ทั้งสภาพดิน อุณหภูมิ ความชื้น และค่าสารอาหาร',
  'Smart Farm',
  'Multi-platform',
  '2 months',
  'Factory / Agriculture',
  2026,
  true,
  'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
  '[
    {"title": "Register & Onboarding", "description": "หน้าสำหรับการสมัครสมาชิกและลงทะเบียนฟาร์ม ออกแบบให้เรียบง่ายลดความซับซ้อน", "image": "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80", "type": "register"},
    {"title": "Real-time Field Telemetry Dashboard", "description": "แผงควบคุมกลางแสดงค่าดัชนีแปลงปลูก ความชื้น และอัตราการเจริญเติบโต", "image": "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80", "type": "dashboard"},
    {"title": "Torrava - Infrastructure Landing Page", "description": "Ready to Manage Infrastructure as One System? นำเสนอภาพรวมการผสานระบบ IoT ทั้งหมด", "image": "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1200&q=80", "type": "landing"}
  ]'::jsonb,
  '{"typography": "Sukhumvit Set, Plus Jakarta Sans", "primaryColor": {"name": "Green Mint", "hex": "#3BE29F"}, "secondaryColors": [{"name": "Olive Forest", "hex": "#5C8B5E"}, {"name": "Sky Cyan Mist", "hex": "#F3FEFF"}, {"name": "Deep Navy", "hex": "#202A45"}]}'::jsonb,
  '{"likes": 142, "views": 1890, "rating": 4.9}'::jsonb,
  ARRAY['DATA', 'Website', 'Factory', 'IoT', 'Mobile']
),
(
  'medicare',
  'MediCare+',
  'Bangkok Metropolitan Health Group',
  'Where care meets innovation - ระบบบริการจัดการคนไข้สำหรับโรงพยาบาล',
  'ระบบบริการจัดการคนไข้สำหรับโรงพยาบาล ช่วยให้ผู้ป่วยสามารถตรวจเช็คคิวพบแพทย์ จองเวลานัดหมาย และตรวจสอบประวัติการรักษาได้อย่างสะดวก รวดเร็ว และแม่นยำ',
  'ยกระดับประสบการณ์ผู้ป่วย (Patient Experience) ด้วยดีไซน์ที่เน้นความเข้าถึงง่าย (High Accessibility) ตัวอักษรขนาดสบายตา สีสันให้ความอบอุ่นและไว้วางใจ ลดระยะเวลารอคิวที่เคาน์เตอร์ลงได้กว่า 45%',
  'Healthcare',
  'Multi-platform',
  '4 months',
  'Healthcare System',
  2026,
  true,
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  '[
    {"title": "Doctor Appointment & Queue System", "description": "หน้าจองคิวตรวจและเลือกแพทย์ผู้เชี่ยวชาญ", "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80", "type": "landing"},
    {"title": "Patient Portal Dashboard", "description": "หน้าแสดงผลการตรวจและบันทึกประวัติสุขภาพทางอิเล็กทรอนิกส์ (EHR)", "image": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80", "type": "dashboard"}
  ]'::jsonb,
  '{"typography": "Plus Jakarta Sans, Sukhumvit Set", "primaryColor": {"name": "Hospital Cyan", "hex": "#00F0FF"}, "secondaryColors": [{"name": "Clean Mint", "hex": "#3BE29F"}, {"name": "Deep Navy", "hex": "#1E293B"}]}'::jsonb,
  '{"likes": 185, "views": 2450, "rating": 5.0}'::jsonb,
  ARRAY['Healthcare', 'Mobile', 'Web', 'Clinic']
),
(
  'finflow',
  'FinFlow',
  'FinFlow Global Capital',
  'แพลตฟอร์มสำหรับจัดการการเงินรายรับรายจ่ายและวิเคราะห์ข้อมูลผ่าน Dashboard',
  'ระบบแดชบอร์ดบริหารสินทรัพย์และกระแสเงินสดสำหรับธุรกิจและบุคคลทั่วไป รองรับการวิเคราะห์แนวโน้มการลงทุน การจัดสรรงบประมาณ และสรุปภาษีอัตโนมัติ',
  'ออกแบบ UX Flow การทำธุรกรรมและจัดการบัญชีหลายสกุลเงินให้ลื่นไหล รวดเร็ว และปลอดภัยตามมาตรฐานสากล',
  'FinTech',
  'Website',
  '3 months',
  'Financial SaaS',
  2026,
  true,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  '[
    {"title": "Financial Overview Dashboard", "description": "รายงานยอดเงินสดหมุนเวียน พอร์ตการลงทุน และสถานะลูกหนี้การค้า", "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80", "type": "dashboard"},
    {"title": "Account Onboarding & KYC", "description": "ขั้นตอนการยืนยันตัวตนระดับองค์กรแบบ 3-step verification", "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", "type": "register"}
  ]'::jsonb,
  '{"typography": "Inter, JetBrains Mono", "primaryColor": {"name": "FinFlow Emerald", "hex": "#10B981"}, "secondaryColors": [{"name": "Dark Slate", "hex": "#0F172A"}, {"name": "Light Mint", "hex": "#E1FE7D"}]}'::jsonb,
  '{"likes": 98, "views": 1420, "rating": 4.8}'::jsonb,
  ARRAY['DATA', 'Website', 'FinTech', 'SaaS']
),
(
  'plantland',
  'Plantland B2B',
  'Plantland Green Living',
  'Hello! Welcome to Plantland - ตลาดต้นไม้และสินค้าเกษตรเพื่อชุมชน',
  'แอปพลิเคชันตลาดต้นไม้และอุปกรณ์จัดสวน B2B เชื่อมโยงสวนพันธุ์ไม้กับร้านค้าปลีก ออกแบบด้วย Visual สไตล์ธรรมชาติ สดชื่น เข้าถึงง่าย',
  'มุ่งเน้นการค้นหาสายพันธุ์ไม้ตามสภาพแสง การรดน้ำ และขนาดพื้นที่ พร้อมระบบให้คำปรึกษาด้านการเพาะปลูก',
  'E-Commerce',
  'Mobile',
  '1.5 months',
  'B2B Marketplace',
  2026,
  false,
  'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=80',
  '[
    {"title": "Welcome & Mobile Login", "description": "ภาพรวมหน้าต้อนรับสไตล์โมเดิร์นพร้อมโทนสีเขียวออร์แกนิก", "image": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80", "type": "register"}
  ]'::jsonb,
  '{"typography": "Sukhumvit Set, Plus Jakarta Sans", "primaryColor": {"name": "Leaf Green", "hex": "#3BE29F"}, "secondaryColors": [{"name": "Warm Lime", "hex": "#E1FE7D"}, {"name": "Deep Evergreen", "hex": "#164E63"}]}'::jsonb,
  '{"likes": 112, "views": 1670, "rating": 4.9}'::jsonb,
  ARRAY['B2B commerce', 'Mobile', 'GreenTech']
),
(
  'myhub',
  'MyHub Supply Chain',
  'Pacific Logistics Logistics Network',
  'ระบบจัดการซัพพลายเชน การจัดเก็บสต็อกสินค้า และการกระจายสินค้า',
  'แพลตฟอร์มบริหารคลังสินค้าอัจฉริยะ (WMS) และจัดการกองยานพาหนะ ช่วยให้ทีมงานตรวจสอบเส้นทางจัดส่ง เช็คสต็อกคงคลังแบบ Real-time',
  'ออกแบบสำหรับบุคลากรทั้งในสำนักงานและคนหน้างานในคลังสินค้า รองรับการสแกนบาร์โค้ด QR code',
  'Logistics',
  'Website',
  '2.5 months',
  'Logistics & Warehouse',
  2026,
  false,
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  '[
    {"title": "Warehouse Control Tower", "description": "หน้ามอนิเตอร์สถานะการเคลื่อนย้ายสินค้าและสล็อตจัดเก็บ", "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80", "type": "admin"}
  ]'::jsonb,
  '{"typography": "Inter, IBM Plex Sans", "primaryColor": {"name": "Transit Orange", "hex": "#F97316"}, "secondaryColors": [{"name": "Slate Blue", "hex": "#202A45"}, {"name": "Silver White", "hex": "#F8FAFC"}]}'::jsonb,
  '{"likes": 76, "views": 950, "rating": 4.7}'::jsonb,
  ARRAY['Logistics', 'Website', 'Enterprise']
),
(
  'eatright',
  'EATRIGHT',
  'Nutrition Science Lab',
  'แอปพลิเคชันแนะนำอาหารสุขภาพและคำนวณสารอาหารเฉพาะบุคคล',
  'ระบบแนะนำโภชนาการที่ออกแบบตามความต้องการเฉพาะของร่างกาย วิเคราะห์เมนูอาหาร และบันทึกแคลอรี่ผ่านระบบกล้อง AI อัจฉริยะ',
  'วิเคราะห์คุณค่าทางโภชนาการแบบรายวันพร้อมคำนวณสารอาหารและแคลอรี่อัตโนมัติ',
  'Healthcare',
  'Mobile',
  '2 months',
  'Health & Nutrition App',
  2026,
  false,
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
  '[
    {"title": "Nutrient Balance Tracker", "description": "คำนวณสัดส่วนสารอาหาร Macronutrients", "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80", "type": "mobile"}
  ]'::jsonb,
  '{"typography": "Inter", "primaryColor": {"name": "Vibrant Green", "hex": "#10B981"}, "secondaryColors": [{"name": "Lemon Yellow", "hex": "#E1FE7D"}, {"name": "Charcoal", "hex": "#1E293B"}]}'::jsonb,
  '{"likes": 64, "views": 820, "rating": 4.6}'::jsonb,
  ARRAY['Health', 'Mobile', 'AI']
),
(
  'seo-audit-pro',
  'SEO Audit Pro',
  'Digital Matrix Media',
  'ระบบตรวจสอบวิเคราะห์ความสมบูรณ์ของเว็บไซต์และอันดับการค้นหา',
  'เครื่องมือตรวจสอบ Technical SEO และประเมิน Core Web Vitals รายวัน แสดงผลคะแนนพร้อมข้อเสนอแนะเชิงลึกสำหรับนักพัฒนาและทีมการตลาด',
  'ประเมินประสิทธิภาพเว็บไซต์ วิเคราะห์คีย์เวิร์ด และตรวจสอบข้อผิดพลาดด้านเทคนิค',
  'Enterprise',
  'Dashboard',
  '1 month',
  'Analytics Platform',
  2026,
  false,
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  '[
    {"title": "Website Health & Keyword Metrics", "description": "กราฟคะแนนความสมบูรณ์และ Core Web Vitals", "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80", "type": "dashboard"}
  ]'::jsonb,
  '{"typography": "Space Grotesk, JetBrains Mono", "primaryColor": {"name": "Audit Amber", "hex": "#F59E0B"}, "secondaryColors": [{"name": "Deep Navy", "hex": "#0F172A"}, {"name": "Soft Yellow", "hex": "#FEF3C7"}]}'::jsonb,
  '{"likes": 83, "views": 1100, "rating": 4.7}'::jsonb,
  ARRAY['Analytics', 'Dashboard', 'SEO', 'Website']
)
ON CONFLICT (id) DO NOTHING;
