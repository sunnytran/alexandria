const multer = require("multer");
const datauri = require("datauri");
const path = require("path");

const storage = multer.memoryStorage();
exports.multerUploads = multer({ storage }).single("image");

exports.dataUri = (req) =>
  datauri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
