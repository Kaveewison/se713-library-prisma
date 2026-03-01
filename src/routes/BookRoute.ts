import express from "express";
import * as service from "../services/BookService";

const router = express.Router();

// GET /books
// GET /books?title=keyword
router.get("/", async (req, res) => {
  const title = req.query.title as string | undefined;

  if (title) {
    const books = await service.searchBooksByTitle(title);
    res.json(books);
    return;
  }

  res.json(await service.getAllBooks());
});

// GET /books/due?date=YYYY-MM-DD
router.get("/due", async (req, res) => {
  const date = req.query.date as string | undefined;
  if (!date) {
    res.status(400).send("Missing query param: date=YYYY-MM-DD");
    return;
  }

  res.json(await service.getBooksDueOnDate(date));
});

// GET /books/not-returned
router.get("/not-returned", async (_req, res) => {
  res.json(await service.getNotReturnedBooks());
});

export default router;