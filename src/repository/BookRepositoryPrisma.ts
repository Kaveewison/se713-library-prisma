import { prisma } from "../lib/prisma";

// 1) หนังสือทั้งหมด
export function getAllBooks() {
  return prisma.book.findMany({
    include: { author: true },
    orderBy: { id: "asc" },
  });
}

// 2) ค้นหาหนังสือตามชื่อ (case-insensitive)
export function searchBooksByTitle(keyword: string) {
  return prisma.book.findMany({
    where: {
      title: { contains: keyword, mode: "insensitive" },
    },
    include: { author: true },
    orderBy: { id: "asc" },
  });
}

// 5.1) ค้นหาหนังสือที่มีกำหนดคืน "ในวันที่กำหนด"
export function getBooksDueOnDate(dateISO: string) {
  const start = new Date(`${dateISO}T00:00:00.000Z`);
  const end = new Date(`${dateISO}T23:59:59.999Z`);

  return prisma.loanItem.findMany({
    where: {
      dueAt: { gte: start, lte: end },
    },
    include: {
      book: { include: { author: true } },
      loan: { include: { member: true } },
    },
    orderBy: { dueAt: "asc" },
  });
}

// 5.2) หนังสือที่ยังไม่ได้คืน (returnedAt = null)
export function getNotReturnedBooks() {
  return prisma.loanItem.findMany({
    where: { returnedAt: null },
    include: {
      book: { include: { author: true } },
      loan: { include: { member: true } },
    },
    orderBy: { dueAt: "asc" },
  });
}