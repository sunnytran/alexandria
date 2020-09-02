const express = require("express");
const bodyParser = require("body-parser");

const multer = require("multer");
let upload = multer();

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
  console.log(req.body.image);

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

app.get("/api/v1/replies/", async (req, res) => {
  const replies = await db("replies");
  res.json(replies);
});

app.post("/api/v1/replies", async (req, res) => {
  data = {
    username: "Anonymous",
    date: new Date(),
    comment: req.body.comment,
    replying_to_post_id: req.body.replyingToPostID,
    replying_to_reply_id: req.body.replyingToReplyID,
    board: req.body.board,
  };

  const replies = await db("replies")
    .insert(data)
    .returning("*")
    .then((res) => res);

  res.json(replies[0]);
});

app.post("/api/v1/test/", upload.fields([]), async (req, res) => {
  console.log(req.body + "<--");
  console.log(req.body);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
