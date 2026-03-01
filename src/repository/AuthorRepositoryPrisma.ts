import { prisma } from "../lib/prisma";

// 3) รายชื่อผู้แต่งทั้งหมด
export function getAllAuthors() {
  return prisma.author.findMany({
    include: { books: true },
    orderBy: { id: "asc" },
  });
}