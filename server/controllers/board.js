const handleBoardGet = (db) => async (req, res) => {
  const board = await db("boards")
    .where({ name: req.params.id })
    .first()
    .then((row) => row);

  res.json(board);
};

module.exports = {
  handleBoardGet: handleBoardGet,
};
