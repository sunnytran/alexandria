const bcrypt = require("bcrypt");

const handleBoardsGet = (db) => async (req, res) => {
  const boards = await db("boards");
  res.json(boards);
};

module.exports = {
  handleBoardsGet: handleBoardsGet,
};
