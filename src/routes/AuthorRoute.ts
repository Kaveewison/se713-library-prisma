import express from "express";
import * as service from "../services/AuthorService";

const router = express.Router();

// GET /authors
router.get("/", async (_req, res) => {
  res.json(await service.getAllAuthors());
});

export default router;