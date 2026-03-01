import express from "express";
import * as service from "../services/BookService";

const router = express.Router();


router.get("/", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize as string) || 5;
  const pageNo = parseInt(req.query.pageNo as string) || 1;
  const keyword = (req.query.keyword as string) || "";
  const title = req.query.title as string | undefined;
  

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

  
    res.setHeader("Access-Control-Expose-Headers", "x-total-count");

    res.json(result.books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  } finally {
    console.log(
      `Request completed: /books keyword="${keyword}" pageNo=${pageNo} pageSize=${pageSize}`
    );
  }
});


router.get("/due", async (req, res) => {
  const date = req.query.date as string | undefined;
  const pageSize = parseInt(req.query.pageSize as string) || 5;
  const pageNo = parseInt(req.query.pageNo as string) || 1;

  if (!date) {
    res.status(400).send("Missing query param: date=YYYY-MM-DD");
    return;
  }

  try {
    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid pageNo or pageSize");
      return;
    }

    const result = await service.getDueLoanItemsPagination(date, pageSize, pageNo);

    if (result.items.length === 0) {
      res.status(404).send("No due books found");
      return;
    }

    res.setHeader("x-total-count", result.count.toString());
    res.setHeader("Access-Control-Expose-Headers", "x-total-count");
    res.json(result.items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    console.log(`Request completed: /books/due date=${date} pageNo=${pageNo} pageSize=${pageSize}`);
  }
});


router.get("/not-returned", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize as string) || 5;
  const pageNo = parseInt(req.query.pageNo as string) || 1;

  try {
    if (pageNo < 1 || pageSize < 1) {
      res.status(400).send("Invalid pageNo or pageSize");
      return;
    }

    const result = await service.getNotReturnedLoanItemsPagination(pageSize, pageNo);

    if (result.items.length === 0) {
      res.status(404).send("No not-returned books found");
      return;
    }

    res.setHeader("x-total-count", result.count.toString());
    res.setHeader("Access-Control-Expose-Headers", "x-total-count");
    res.json(result.items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    console.log(`Request completed: /books/not-returned pageNo=${pageNo} pageSize=${pageSize}`);
  }
});

export default router;