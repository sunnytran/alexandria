const express = require("express");
require("dotenv").config();
const fs = require("fs");
const bodyParser = require("body-parser");

const db = require("./server/config/db.js");
const boards = require("./server/controllers/boards");
const board = require("./server/controllers/board");
const posts = require("./server/controllers/posts");
const replies = require("./server/controllers/replies");

const {
  uploader,
  cloudinaryConfig,
} = require("./server/config/cloudinaryConfig");
const { multerUploads, dataUri } = require("./server/middlewares/multer");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);

app.get("/api/v1/boards", boards.handleBoardsGet(db));
app.get("/api/v1/board/:id", board.handleBoardGet(db));
app.get("/api/v1/posts/:id", posts.handlePostsGet(db));
app.post(
  "/api/v1/posts",
  multerUploads,
  posts.handlePostsPost(db, dataUri, uploader)
);
app.get("/api/v1/replies", replies.handleRepliesGet(db));
app.post("/api/v1/replies", replies.hanldeRepliesPost(db));

const PORT = process.env.DB_PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
