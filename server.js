const express = require("express");
require("dotenv").config();
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

const {
  uploader,
  cloudinaryConfig,
} = require("./server/config/cloudinary.config");
const { multerUploads, dataUri } = require("./server/middlewares/multer");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);

app.set("trust proxy", true);

const db = require("./server/config/db.js");
const boards = require("./server/controllers/boards");
const board = require("./server/controllers/board");
const post = require("./server/controllers/post");
const posts = require("./server/controllers/posts");
const replies = require("./server/controllers/replies");
const stats = require("./server/controllers/stats");

app.get("/api/v1/boards", boards.handleBoardsGet(db));
app.get("/api/v1/board/:id", board.handleBoardGet(db));
app.get("/api/v1/posts/:id", posts.handlePostsGet(db));
app.get("/api/v1/post/:id", post.handlePostGet(db));
app.post(
  "/api/v1/post",
  multerUploads,
  post.handlePostPost(db, dataUri, uploader)
);
app.get("/api/v1/replies", replies.handleRepliesGet(db));
app.post(
  "/api/v1/replies",
  multerUploads,
  replies.handleRepliesPost(db, dataUri, uploader)
);
app.get("/api/v1/stats", stats.handleStatsGet(db));

const passport = require("passport");
const initializePassport = require("./server/config/passport.config");
initializePassport(passport);
const session = require("express-session");
const flash = require("express-flash");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.post("/login", (req, res) => {
  console.log(req.body);
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash: true,
  });
});

app.get("/user", (req, res) => {});

const PORT = process.env.DB_PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
