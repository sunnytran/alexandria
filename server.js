const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const multer = require("multer");

const boards = require("./server/controllers/boards");
const board = require("./server/controllers/board");
const posts = require("./server/controllers/posts");
const replies = require("./server/controllers/replies");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./server/db.js");

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

// app.post("/api/v1/posts", upload.single("image"), async (req, res) => {
//   // console.log(req.body.comment);
//   // var img = fs.readFileSync(req.file.path);
//   // var encoded = img.toString("base64");
//   // var finalImg = {
//   //   contentType: req.file.mimetype,
//   //   image: Buffer.from(encoded, "base64"),
//   // };
//   // console.log(encoded.substring(0, 10));
//   // console.log(finalImg);
//   // console.log(img);

//   data = {
//     username: "Anonymous",
//     date: new Date(),
//     comment: req.body.comment,
//     board: req.body.board,
//     // image: finalImg,
//   };

//   const post = await db("posts")
//     .insert(data)
//     .returning("*")
//     .then((res) => res);
//   res.json(post[0]);
// });

app.get("/api/v1/boards", boards.handleBoardsGet(db));
app.get("/api/v1/board/:id", board.handleBoardGet(db));
app.get("/api/v1/posts/:id", posts.handlePostsGet(db));
app.post("/api/v1/posts", upload.single("image"), posts.handlePostsPost(db));
app.get("/api/v1/replies", replies.handleRepliesGet(db));
app.post("/api/v1/replies", replies.hanldeRepliesPost(db));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
