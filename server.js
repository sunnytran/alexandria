const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/api/v1/post", async (req, res) => {
  console.log(req.body);

  await db("posts").insert({
    username: "Anonymous",
    date: new Date(),
    comment: req.body.comment,
    board: req.body.board,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
