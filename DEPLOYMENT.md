# 🚀 Render Deployment Guide

## เตรียม Project ✅

ไฟล์ทั้งหมดถูกปรับแต่งพร้อม deploy แล้ว:
- ✅ `server.ts` - ใช้ `process.env.PORT`
- ✅ `render.yaml` - Render configuration
- ✅ `.gitignore` - ปรับแล้ว
- ✅ Build สำเร็จ

---

## ขั้นตอนการ Deploy

### 1. Push Code ขึ้น GitHub

```bash
# ถ้ายังไม่ได้ init git
git init
git add .
git commit -m "Prepare for Render deployment"

# เชื่อมกับ GitHub repo (ใช้ URL ของคุณ)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. สร้าง Render Account

1. ไปที่ https://render.com
2. Sign Up ด้วย GitHub account
3. ให้สิทธิ์ Render เข้าถึง repository

### 3. Create PostgreSQL Database

1. คลิก **"New +"** → **"PostgreSQL"**
2. ตั้งค่า:
   - **Name**: `library-db`
   - **Database**: `library`
   - **User**: `admin` (หรือชื่อที่ต้องการ)
   - **Region**: เลือกที่ใกล้ที่สุด
   - **Plan**: Free
3. คลิก **"Create Database"**
4. **บันทึก Internal Database URL** (จะใช้ในขั้นตอนถัดไป)

### 4. Create Web Service

1. คลิก **"New +"** → **"Web Service"**
2. เลือก GitHub repository ของคุณ
3. ตั้งค่า:

   **Basic Settings:**
   - **Name**: `se713-library-prisma` (หรือชื่อที่ต้องการ)
   - **Region**: เลือกเดียวกับ Database
   - **Branch**: `main`
   - **Root Directory**: ว่างไว้
   - **Runtime**: `Node`

   **Build & Deploy:**
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`

4. คลิก **"Advanced"** เพื่อตั้งค่า Environment Variables

### 5. ตั้งค่า Environment Variables

คลิก **"Add Environment Variable"** และเพิ่มทีละตัว:

```
DATABASE_URL=<คัดลอกจาก Internal Database URL>
DIRECT_URL=<คัดลอกจาก Internal Database URL เดียวกัน>
NODE_ENV=production
```

**ตัวอย่าง DATABASE_URL:**
```
postgresql://admin:password@dpg-xxxxx.oregon-postgres.render.com/library
```

### 6. Create Service

1. คลิก **"Create Web Service"**
2. รอ Render build และ deploy (ประมาณ 3-5 นาที)
3. ดู Logs เพื่อตรวจสอบว่า build สำเร็จ

### 7. Run Database Migrations

หลังจาก deploy สำเร็จ:

1. ไปที่ Web Service → **"Shell"**
2. รันคำสั่ง:
   ```bash
   npx prisma migrate deploy
   ```

3. (Optional) Seed ข้อมูล:
   ```bash
   npx prisma db seed
   ```

---

## ✅ ทดสอบ

เมื่อ deploy สำเร็จ Render จะให้ URL เช่น:
```
https://se713-library-prisma.onrender.com
```

ทดสอบ:
- 🌐 หน้าเว็บ: `https://your-app.onrender.com/`
- 📚 Books API: `https://your-app.onrender.com/books?pageSize=10&pageNo=1`
- ✍️ Authors API: `https://your-app.onrender.com/authors?pageSize=10&pageNo=1`
- 👥 Members API: `https://your-app.onrender.com/members?pageSize=10&pageNo=1`

---

## 🔄 Update Code ในอนาคต

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Render จะ auto-deploy ทันทีที่ push ขึ้น GitHub!

---

## ⚠️ สิ่งที่ควรรู้

- **Free Plan**: จะ sleep หลังไม่มีการใช้งาน 15 นาที (ครั้งถัดไปจะใช้เวลา 30-60 วิ boot)
- **Database**: 90 days free PostgreSQL (ควร upgrade หรือย้ายก่อนหมดอายุ)
- **Custom Domain**: สามารถเชื่อมโดเมนของคุณเองได้

---

## 🐛 Troubleshooting

**Build Failed:**
- ตรวจสอบ logs ใน Render dashboard
- ลองรัน `npm run build` ใน local ดูว่ามี error ไหม

**Database Connection Error:**
- ตรวจสอบ `DATABASE_URL` และ `DIRECT_URL` ว่าถูกต้อง
- ตรวจสอบว่า database อยู่ region เดียวกับ web service

**App ไม่ตอบสนอง:**
- รอ 1-2 นาที (cold start)
- ตรวจสอบ logs ดูว่า migration ทำสำเร็จหรือไม่

---

## 📞 Support

- Render Docs: https://docs.render.com
- Prisma Docs: https://www.prisma.io/docs
