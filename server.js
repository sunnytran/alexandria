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

app.get("/api/v1/posts/:id", async (req, res) => {
  const posts = await db("posts").where({ board: req.params.id });
  res.json(posts);
});

app.post("/api/v1/posts", async (req, res) => {
  data = {
    username: "Anonymous",
    date: new Date(),
    comment: req.body.comment,
    board: req.body.board,
  };

  const post = await db("posts")
    .insert(data)
    .returning("*")
    .then((res) => res);

  res.json(post[0]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
