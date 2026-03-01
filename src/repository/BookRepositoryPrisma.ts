import { prisma } from "../lib/prisma";
import type { PageBook } from "../models/BookPage";
import { Prisma } from "@prisma/client";


export function getAllBooks() {
  return prisma.book.findMany({
    include: { author: true },
    orderBy: { id: "asc" },
  });
}


export function searchBooksByTitle(keyword: string) {
  return prisma.book.findMany({
    where: {
      title: { contains: keyword, mode: "insensitive" },
    },
    include: { author: true },
    orderBy: { id: "asc" },
  });
}


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

export async function getBooksPagination(keyword: string, pageSize: number, pageNo: number) {
  const safeKeyword = keyword ?? "";


  const where = safeKeyword
    ? {
        OR: [
          { title: { contains: safeKeyword, mode: Prisma.QueryMode.insensitive } },
          { category: { contains: safeKeyword, mode: Prisma.QueryMode.insensitive } },
          {
            author: {
              OR: [
                { firstName: { contains: safeKeyword, mode: Prisma.QueryMode.insensitive } },
                { lastName: { contains: safeKeyword, mode: Prisma.QueryMode.insensitive } }
              ]
            }
          },

          {
            loanItems: {
              some: {
                loan: {
                  member: {
                    OR: [
                      { firstName: { contains: safeKeyword, mode: Prisma.QueryMode.insensitive } },
                      { lastName: { contains: safeKeyword, mode: Prisma.QueryMode.insensitive } }
                    ]
                  }
                }
              }
            }
          }
        ]
      }
    : {}; 

  const books = await prisma.book.findMany({
    where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    include: { author: true },
    orderBy: { id: "asc" }
  });

  const count = await prisma.book.count({ where });

  return { count, books } as PageBook;
}

export async function getDueLoanItemsPagination(dateISO: string, pageSize: number, pageNo: number) {
  const start = new Date(`${dateISO}T00:00:00.000Z`);
  const end = new Date(`${dateISO}T23:59:59.999Z`);

  const where = { dueAt: { gte: start, lte: end } };

  const items = await prisma.loanItem.findMany({
    where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    include: {
      book: { include: { author: true } },
      loan: { include: { member: true } },
    },
    orderBy: { dueAt: "asc" },
  });

  const count = await prisma.loanItem.count({ where });
  return { count, items };
}

export async function getNotReturnedLoanItemsPagination(pageSize: number, pageNo: number) {
  const where = { returnedAt: null as any };

  const items = await prisma.loanItem.findMany({
    where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    include: {
      book: { include: { author: true } },
      loan: { include: { member: true } },
    },
    orderBy: { dueAt: "asc" },
  });

  const count = await prisma.loanItem.count({ where });
  return { count, items };
}
