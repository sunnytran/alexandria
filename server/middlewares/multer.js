const multer = require("multer");
const Datauri = require("datauri");
const DatauriParser = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
exports.multerUploads = multer({ storage }).single("image");

const parser = new DatauriParser();
exports.dataUri = (req) =>
  parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
