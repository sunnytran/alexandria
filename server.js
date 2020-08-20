const express = require("express");

const app = express();
const db = require("./data/db.js");

app.get("/api/v1/boards", async (req, res) => {
  const boards = await db("boards");
  res.json(boards);
});

app.get("/api/v1/board/:id", async (req, res) => {
  const board = await db("boards")
    .where({ name: req.params.id })
    .first()
    .then((row) => row);

  res.json(board);
});

app.post("/api/v1/posts", async (req, res) => {});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
