import { prisma } from "../lib/prisma";

// 4.1) แสดงสมาชิกตามชื่อ (ค้น first/last)
export function findMembersByName(keyword: string) {
  return prisma.member.findMany({
    where: {
      OR: [
        { firstName: { contains: keyword, mode: "insensitive" } },
        { lastName: { contains: keyword, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "asc" },
  });
}

// 4.2) แสดงสมาชิกตามรหัสสมาชิก
export function findMemberByCode(memberCode: string) {
  return prisma.member.findUnique({
    where: { memberCode },
  });
}