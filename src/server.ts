// import express from "express";

// const app = express();
// app.use(express.json());

// app.get("/", (_req, res) => {
//   res.send("Library API is running");
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

import express from "express";
import bookRoute from "./routes/BookRoute";
import authorRoute from "./routes/AuthorRoute";
import memberRoute from "./routes/MemberRoute";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Library API is running");
});

app.use("/books", bookRoute);
app.use("/authors", authorRoute);
app.use("/members", memberRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});