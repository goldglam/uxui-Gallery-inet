# INET UX/UI Design Resource Hub & Gallery (2026)

> เว็บแอปพลิเคชันรวบรวมผลงานและ Design System ของทีม UX/UI บริษัท INET ออกแบบตาม Figma 1:1 (Figma File: `Inet (Copy)`, Node: `573:45445` และ `593:48864`) เพื่อให้ทุกทีมสามารถศึกษาแนวทางการออกแบบ สถาปัตยกรรมข้อมูล และนำ Design Tokens ไปต่อยอดในการพัฒนาโปรดักต์ได้อย่างแม่นยำ

---

## 🌟 จุดเด่นของระบบ (Core Features)

1. **Pixel-Perfect Figma Parity (1:1):**
   - ถอดรหัสและผสาน Design Tokens มาตรฐาน INET (`#3BE29F`, `#E1FE7D`, `#202A45`, Foundation Yellows)
   - ฟอนต์มาตรฐานองค์กร: **Sukhumvit Set**, **Inter**, **Plus Jakarta Sans**
   - รองรับทั้ง **Light Mode** (Figma Default) และ **Dark Mode** (Full Slate Dark Theme) พร้อมสลับธีมได้อย่างนุ่มนวล

2. **หน้าหลัก Gallery (Explore & Discovery):**
   - **Hero Section:** ระบบค้นหาอัจฉริยะ (Live Search & Category Quick Filters)
   - **Recently Projects:** แสดงการ์ดผลงานเด่นแบบไดนามิก (Harvesta, MediCare+, FinFlow, Plantland, MyHub)
   - **Features & Screen Breakdown:** แยกประเภทหน้าจอ (Register, Dashboard, Landing page, Admin page)
   - **Moodboard & Color Palette:** สรุปชุดสี Hex Swatches ที่คลิกคัดลอกค่าสีได้ทันที
   - **Request Modal:** แบบฟอร์มส่งคำขอให้ออกแบบ UI/UX สำหรับทีมภายในองค์กร

3. **หน้าดูรายละเอียดแต่ละโปรเจกต์ (`Project dt` - Node `593:48864`):**
   - **Breadcrumb:** `< Factory > Harvesta` พร้อมปุ่มย้อนกลับสู่หน้า Gallery
   - **Hero Feature Display:** Tablet 3D Perspective Graphic แสดงหน้า Field 01 Telemetry, Optimal Zone 64%, และสถิติผลผลิต
   - **3-Column Specs Pills:** `Duration` (2 months), `Platform` (website), `Type` (Factory)
   - **Description:** ข้อความภาษาไทยอธิบายฟังก์ชันและเป้าหมายของระบบตรงตาม Figma
   - **Screens Breakdown:** แสดงหน้า Register (Myna UI), Dashboard (Financial KPIs & Cashflow), Landing page (Torrava)
   - **Moodboard Spec & Action Bar:** Typography Sukhumvit Set, Color Swatches, ปุ่ม Email Designer, Like, และ Download Tokens
   - **Relate Projects:** แสดง 3 ผลงานที่เกี่ยวข้องพร้อมลิงก์สลับดูข้อมูล

4. **สเปกสำหรับทีม Developer (Backend & Architecture Ready):**
   - **Authentication:** สเปก SSO OIDC / SAML 2.0 เชื่อมต่อ IdP ขององค์กร และ RBAC Matrix
   - **Database:** PostgreSQL 15+ DDL Schema (`schema.sql`) และ Prisma ORM Schema (`prisma/schema.prisma`)
   - **Asset Storage:** สถาปัตยกรรม Presigned Upload ไปยัง GCS/S3 พร้อมระบบ CDN Image Optimization
   - **Notifications:** บริการส่ง Webhook แจ้งเตือนเข้า Slack / Microsoft Teams และ Email Notification

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
inet-uxui-gallery/
├── src/
│   ├── components/            # React UI Components
│   │   ├── Navbar.tsx         # แถบเมนูด้านบน พร้อมปุ่มสลับธีมและรายการโปรด
│   │   ├── HeroSection.tsx    # ส่วนหัว ค้นหา และฟิลเตอร์
│   │   ├── RecentlyProjects.tsx # การ์ดผลงานเด่น
│   │   ├── FeaturesSection.tsx # จำแนกประเภท Component
│   │   ├── MoodboardSection.tsx # พาเลทสีและ Design Tokens
│   │   ├── ProjectDetailModal.tsx # หน้ารายละเอียดโปรเจกต์ (Figma Node 593:48864)
│   │   ├── RequestModal.tsx   # แบบฟอร์มขอให้ออกแบบ
│   │   ├── CtaBanner.tsx      # แบนเนอร์ด้านล่าง
│   │   └── Footer.tsx         # ส่วนท้ายเว็บไซต์
│   ├── data/
│   │   └── mockData.ts        # ข้อมูลโปรเจกต์, Screens, สเปกสี และ Typo
│   ├── services/
│   │   └── notificationService.ts # ระบบแจ้งเตือน Webhook/Email
│   ├── types/
│   │   ├── index.ts           # Frontend TypeScript Interfaces
│   │   └── api.ts             # Backend & Database Types
│   ├── App.tsx                # Main Application Container
│   └── main.tsx               # Entry Point
├── docs/
│   └── DEVELOPER_SPECS.md     # คู่มือนักพัฒนา (SSO, Database, APIs)
├── Design/
│   └── DESIGN.md              # ดีไซน์โทเค็นที่สกัดจาก Figma
├── prisma/
│   └── schema.prisma          # Prisma ORM Data Models
├── Dockerfile                 # Container Deployment Config
├── nginx.conf                 # Production Nginx Reverse Proxy & Static Cache
├── DEPLOYMENT_GUIDE.md        # คู่มือการนำขึ้น Server ต่างๆ
├── schema.sql                 # PostgreSQL Database DDL
├── preview.html               # Turnkey Single-File Runner (Zero-Install)
├── index.html                 # Vite HTML Entry
├── package.json               # Node Package Configuration
├── tailwind.config.js         # Tailwind CSS INET Theme
├── tsconfig.json              # TypeScript Configuration
└── vite.config.ts             # Vite Build Tool Configuration
```

---

## 🚀 วิธีการรันและใช้งาน (Quick Start)

### วิธีที่ 1: รันทันทีผ่าน Browser (Zero Installation)
ไม่ต้องติดตั้ง Node.js หรือ dependency ใดๆ เพิ่มเติม:
- เพียงดับเบิลคลิกเปิดไฟล์ `preview.html` บนเบราว์เซอร์ (Chrome, Edge, Safari, Firefox)
- ระบบจะโหลด UI, ฟอนต์, สไตล์ Tailwind CSS และไอคอน Lucide แบบครบวงจรพร้อมใช้งานทันที

### วิธีที่ 2: รันผ่าน Vite Dev Server (React + TypeScript)
```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. เริ่มต้น Development Server
npm run dev

# 3. Build สำหรับ Production
npm run build
```

### วิธีที่ 3: รันด้วย Docker Container
```bash
# Build image
docker build -t inet-uxui-gallery:latest .

# รัน Container ที่ Port 8080
docker run -d -p 8080:80 --name inet-gallery inet-uxui-gallery:latest
```

---

## 🔧 Git Setup & Remote Repository

เพื่อนำขึ้น Git (GitHub, GitLab, หรือ INET Internal Git):

```bash
# ตรวจสอบสถานะ Git
git status

# เชื่อมต่อกับ Remote Repository (แทนที่ <REMOTE_URL> ด้วย URL ของคุณ)
git remote add origin <REMOTE_URL>

# Push ขึ้น Branch main
git push -u origin main
```

---

© 2026 INET UX/UI Team. All rights reserved.
