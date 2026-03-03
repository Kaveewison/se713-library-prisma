import { prisma } from "../lib/prisma";

// Get members with pagination
export async function getMembersPagination(keyword: string, pageSize: number, pageNo: number) {
  const where = keyword
    ? {
        OR: [
          { firstName: { contains: keyword, mode: "insensitive" as const } },
          { lastName: { contains: keyword, mode: "insensitive" as const } },
          { memberCode: { contains: keyword, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [members, count] = await Promise.all([
    prisma.member.findMany({
      where,
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      orderBy: { id: "asc" },
      include: {
        loans: true,
      },
    }),
    prisma.member.count({ where }),
  ]);

  return { members, count };
}

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