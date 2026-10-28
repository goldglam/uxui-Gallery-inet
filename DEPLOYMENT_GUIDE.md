# INET UX/UI Design Resource Hub 2026 - Production Deployment Package

โฟลเดอร์นี้รวบรวมไฟล์ที่พร้อมสำหรับการนำขึ้นใช้งาน (Deploy to Production) บนทุกสภาพแวดล้อม โดยเป็นชุดไฟล์แบบ Standalone Zero-Build Dependency สามารถนำไปวางบน Web Server หรือรันผ่าน Container ได้ทันที

---

## 📁 โครงสร้างไฟล์ในโฟลเดอร์ `deploy/`

```
deploy/
├── index.html            # หน้าเว็บหลัก (Entry point) พร้อมฟังก์ชันครบถ้วน 100%
├── preview.html          # สำเนาไฟล์สำหรับเข้าถึงผ่าน /preview.html
├── nginx.conf            # ไฟล์ Config Nginx มาตรฐาน Production (พร้อม Gzip & Security Headers)
├── Dockerfile            # Container definition สำหรับรันบน Docker / Kubernetes / Cloud Run
├── schema.sql            # สคริปต์ฐานข้อมูล PostgreSQL / DDL Schema (สำหรับ Backend Integration)
├── docs/
│   ├── DEVELOPER_SPECS.md # สเปกของระบบ, สถาปัตยกรรม, และ Data Models
│   └── DESIGN.md          # Design System Guidelines (Tokens, Colors, Spacing)
└── DEPLOYMENT_GUIDE.md   # คู่มือการนำขึ้นระบบฉบับนี้
```

---

## 🚀 วิธีการนำขึ้นใช้งาน (Deployment Methods)

### 1. นำขึ้น Static Web Hosting / INET Cloud Hosting / cPanel
- อัปโหลดไฟล์ `index.html` (และ `preview.html`) ไปไว้ที่ Document Root (เช่น `public_html/` หรือ `www/` หรือ Bucket ของ Cloud Storage)
- ระบบพร้อมทำงานทันที รองรับทั้ง HTTP/HTTPS, Responsive ทุกหน้าจอ และ Dark/Light Mode

---

### 2. นำขึ้นใช้งานผ่าน Docker Container
สามารถ Build และรัน Container ได้ทันทีด้วยคำสั่ง:

```bash
# Build Docker image
docker build -t inet-uxui-gallery:2026 .

# Run Container ที่ Port 80 หรือ 8080
docker run -d -p 8080:80 --name inet-gallery inet-uxui-gallery:2026

# ตรวจสอบสถานะการทำงาน
curl http://localhost:8080
```

---

### 3. นำขึ้นใช้งานบน Linux / Nginx Server
1. คัดลอก `index.html` ไปไว้ที่ `/var/www/inet-gallery/`
2. คัดลอก `nginx.conf` ไปไว้ที่ `/etc/nginx/conf.d/inet-gallery.conf` (ปรับแก้ `server_name` และ `root` ตามโดเมนจริง)
3. ตรวจสอบและ Reload Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

### 4. ทดสอบเปิดใช้งานในเครื่องแบบ Local Web Server
หากต้องการเปิดทดสอบอย่างรวดเร็วในเครื่อง:

```bash
# วิธีที่ 1: Python HTTP Server
python3 -m http.server 8080

# วิธีที่ 2: npx serve
npx serve .
```
แล้วเปิดเบราว์เซอร์ไปที่ `http://localhost:8080`

---

## 🛡️ ข้อมูลการตรวจสอบคุณภาพ (QA & Verification)
- **สถานะ**: ผ่านการทดสอบครบทั้ง 19 Test Cases (100% PASS)
- **ความเข้ากันได้**: Google Chrome, Microsoft Edge, Safari, Firefox, iOS Safari, Android Chrome
- **Accessibility**: Keyboard Navigation (Esc to close modal), Form Labels, Color Contrast AA/AAA
- **Performance**: Zero local dependencies, Lightweight CDN delivery
