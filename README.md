📚 SE713 Library Backend

Backend ระบบห้องสมุด พัฒนาโดยใช้:

Node.js

Express

Prisma ORM

PostgreSQL

Docker

TypeScript

🚀 Setup

1️⃣ Install dependencies
npm install

2️⃣ Start PostgreSQL (Docker)
docker compose up -d

3️⃣ Run Migration
npx prisma migrate dev --name init
npx prisma generate

4️⃣ Seed Data
npm run seed

5️⃣ Start Server
npm run dev


Server:http://localhost:3000

🏗 Project Structure

src/

 ├── routes/
 
 ├── services/
 
 ├── repository/
 
 ├── lib/prisma.ts
 
 └── server.ts

Architecture:

Routes → Controller

Services → Business Logic

Repository → Prisma (Database Access)

📡 API Endpoints
📘 Books

GET /books (pagination + search)

GET /books?keyword=prisma

GET /books/due?date=YYYY-MM-DD

GET /books/not-returned

👤 Authors

GET /authors

🧑‍🎓 Members

GET /members?name=keyword

GET /members/code/:memberCode

✨ Features

Prisma ORM

PostgreSQL (Docker)

Pagination (pageSize, pageNo)

x-total-count header

Case-insensitive search

Relational queries (Author, Loan, Member)

Error handling (400 / 404 / 500)

📌 Notes

Due date และ return date ถูกเก็บใน LoanItem

Seed data พร้อมใช้งานหลังรัน npm run seed

รองรับ search หลาย field และ nested relation

