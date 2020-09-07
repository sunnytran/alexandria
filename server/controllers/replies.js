const handleRepliesGet = (db) => async (req, res) => {
  const replies = await db("replies");
  res.json(replies);
};

const hanldeRepliesPost = (db) => async (req, res) => {
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
};

module.exports = {
  handleRepliesGet: handleRepliesGet,
  hanldeRepliesPost: hanldeRepliesPost,
};
