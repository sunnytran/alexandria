const express = require("express");
const bodyParser = require("body-parser");

const multer = require("multer");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./data/db.js");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

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

app.post("/api/v1/test/", upload.single("image"), async (req, res) => {
  console.log(req);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
