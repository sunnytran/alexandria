const express = require("express");

const app = express();
const db = require("./data/db.js");

app.get("/boards", (req, res) => {
  const boards = await db("boards");
  console.log(boards)
  res.json({ boards })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
