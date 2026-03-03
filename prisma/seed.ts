import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.loanItem.deleteMany();
  await prisma.loan.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.member.deleteMany();

  // Authors (8 records)
  const a1 = await prisma.author.create({
    data: { firstName: "Somchai", lastName: "Wong", affiliation: "CMU" }
  });
  const a2 = await prisma.author.create({
    data: { firstName: "Suda", lastName: "Khan", affiliation: "CAMT" }
  });
  const a3 = await prisma.author.create({
    data: { firstName: "Narong", lastName: "Patel", affiliation: "CU" }
  });
  const a4 = await prisma.author.create({
    data: { firstName: "Pranee", lastName: "Smith", affiliation: "KU" }
  });
  const a5 = await prisma.author.create({
    data: { firstName: "Wichai", lastName: "Brown", affiliation: "TU" }
  });
  const a6 = await prisma.author.create({
    data: { firstName: "Siriwan", lastName: "Lee", affiliation: "MU" }
  });
  const a7 = await prisma.author.create({
    data: { firstName: "Kittipong", lastName: "Chen", affiliation: "KMUTT" }
  });
  const a8 = await prisma.author.create({
    data: { firstName: "Anchalee", lastName: "Davis", affiliation: "PSU" }
  });

  // Books (8 records)
  const b1 = await prisma.book.create({
    data: { title: "Node.js Basics", isbn: "978-0000000001", category: "Tech", authorId: a1.id }
  });
  const b2 = await prisma.book.create({
    data: { title: "Prisma ORM", isbn: "978-0000000002", category: "Tech", authorId: a2.id }
  });
  const b3 = await prisma.book.create({
    data: { title: "TypeScript Mastery", isbn: "978-0000000003", category: "Tech", authorId: a3.id }
  });
  const b4 = await prisma.book.create({
    data: { title: "React for Beginners", isbn: "978-0000000004", category: "Tech", authorId: a4.id }
  });
  const b5 = await prisma.book.create({
    data: { title: "Database Design", isbn: "978-0000000005", category: "Tech", authorId: a5.id }
  });
  const b6 = await prisma.book.create({
    data: { title: "Cloud Computing", isbn: "978-0000000006", category: "Tech", authorId: a6.id }
  });
  const b7 = await prisma.book.create({
    data: { title: "Machine Learning", isbn: "978-0000000007", category: "Science", authorId: a7.id }
  });
  const b8 = await prisma.book.create({
    data: { title: "Data Structures", isbn: "978-0000000008", category: "Tech", authorId: a8.id }
  });

  // Members (8 records)
  const m1 = await prisma.member.create({
    data: { memberCode: "M001", firstName: "Niran", lastName: "S.", phone: "0810000001" }
  });
  const m2 = await prisma.member.create({
    data: { memberCode: "M002", firstName: "Apinya", lastName: "T.", phone: "0810000002" }
  });
  const m3 = await prisma.member.create({
    data: { memberCode: "M003", firstName: "Chatchai", lastName: "P.", phone: "0810000003" }
  });
  const m4 = await prisma.member.create({
    data: { memberCode: "M004", firstName: "Duangjai", lastName: "K.", phone: "0810000004" }
  });
  const m5 = await prisma.member.create({
    data: { memberCode: "M005", firstName: "Ekkachai", lastName: "L.", phone: "0810000005" }
  });
  const m6 = await prisma.member.create({
    data: { memberCode: "M006", firstName: "Fon", lastName: "M.", phone: "0810000006" }
  });
  const m7 = await prisma.member.create({
    data: { memberCode: "M007", firstName: "Golf", lastName: "N.", phone: "0810000007" }
  });
  const m8 = await prisma.member.create({
    data: { memberCode: "M008", firstName: "Hansa", lastName: "R.", phone: "0810000008" }
  });

  // Loans
  const loan = await prisma.loan.create({ data: { memberId: m1.id } });
  const loan2 = await prisma.loan.create({ data: { memberId: m2.id } });
  const loan3 = await prisma.loan.create({ data: { memberId: m3.id } });
  const loan4 = await prisma.loan.create({ data: { memberId: m4.id } });

  // Loan Items
  await prisma.loanItem.createMany({
    data: [
      { loanId: loan.id, bookId: b1.id, dueAt: new Date("2026-03-10T10:00:00.000Z"), returnedAt: null },
      { loanId: loan.id, bookId: b2.id, dueAt: new Date("2026-03-01T10:00:00.000Z"), returnedAt: new Date("2026-02-28T10:00:00.000Z") },
      { loanId: loan2.id, bookId: b3.id, dueAt: new Date("2026-03-15T10:00:00.000Z"), returnedAt: null },
      { loanId: loan2.id, bookId: b4.id, dueAt: new Date("2026-03-12T10:00:00.000Z"), returnedAt: null },
      { loanId: loan3.id, bookId: b5.id, dueAt: new Date("2026-02-25T10:00:00.000Z"), returnedAt: new Date("2026-02-24T10:00:00.000Z") },
      { loanId: loan3.id, bookId: b6.id, dueAt: new Date("2026-03-08T10:00:00.000Z"), returnedAt: null },
      { loanId: loan4.id, bookId: b7.id, dueAt: new Date("2026-03-20T10:00:00.000Z"), returnedAt: null },
      { loanId: loan4.id, bookId: b8.id, dueAt: new Date("2026-03-18T10:00:00.000Z"), returnedAt: null }
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