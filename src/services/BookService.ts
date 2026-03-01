import * as repo from "../repository/BookRepositoryPrisma";
import express from "express";
import * as service from "../services/BookService";

const router = express.Router();

router.get("/", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize as string) || 5;
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const keyword = (req.query.keyword as string) || "";

  try {
    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid pageNo or pageSize");
      return;
    }

    const result = await service.getBooksPagination(keyword, pageSize, pageNo);

    if (result.books.length === 0) {
      res.status(404).send("No book found");
      return;
    }

    res.setHeader("x-total-count", result.count.toString());
    res.json(result.books);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    return;
  } finally {
    console.log(`Request completed: /books keyword="${keyword}" pageNo=${pageNo} pageSize=${pageSize}`);
  }
});

export default router;


export function getAllBooks() {
  return repo.getAllBooks();
}

export function searchBooksByTitle(keyword: string) {
  return repo.searchBooksByTitle(keyword);
}

export function getBooksDueOnDate(dateISO: string) {
  return repo.getBooksDueOnDate(dateISO);
}

export function getNotReturnedBooks() {
  return repo.getNotReturnedBooks();
}

export function getBooksPagination(keyword: string, pageSize: number, pageNo: number) {
  return repo.getBooksPagination(keyword, pageSize, pageNo);
}

export function getDueLoanItemsPagination(dateISO: string, pageSize: number, pageNo: number) {
  return repo.getDueLoanItemsPagination(dateISO, pageSize, pageNo);
}

export function getNotReturnedLoanItemsPagination(pageSize: number, pageNo: number) {
  return repo.getNotReturnedLoanItemsPagination(pageSize, pageNo);
}