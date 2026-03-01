import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.loanItem.deleteMany();
  await prisma.loan.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.member.deleteMany();

  const a1 = await prisma.author.create({
    data: { firstName: "Somchai", lastName: "Wong", affiliation: "CMU" }
  });
  const a2 = await prisma.author.create({
    data: { firstName: "Suda", lastName: "Khan", affiliation: "CAMT" }
  });

  const b1 = await prisma.book.create({
    data: { title: "Node.js Basics", isbn: "978-0000000001", category: "Tech", authorId: a1.id }
  });
  const b2 = await prisma.book.create({
    data: { title: "Prisma ORM", isbn: "978-0000000002", category: "Tech", authorId: a2.id }
  });

  const m1 = await prisma.member.create({
    data: { memberCode: "M001", firstName: "Niran", lastName: "S.", phone: "0810000001" }
  });

  const loan = await prisma.loan.create({ data: { memberId: m1.id } });

  await prisma.loanItem.createMany({
    data: [
      { loanId: loan.id, bookId: b1.id, dueAt: new Date("2026-03-10T10:00:00.000Z"), returnedAt: null },
      { loanId: loan.id, bookId: b2.id, dueAt: new Date("2026-03-01T10:00:00.000Z"), returnedAt: new Date("2026-02-28T10:00:00.000Z") }
    ]
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });