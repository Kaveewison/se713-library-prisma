import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Library API is running");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});