var stringUtils = require("../utils/stringUtils");

const handleRepliesGet = (db) => async (req, res) => {
  const replies = await db("replies").where(req.query);
  res.json(replies);
};

const handleRepliesPost = (db, dataUri, uploader) => async (req, res) => {
  var name = stringUtils.generateName(req.ip, req.body.replyingToPostID);

  data = {
    username:
      req.body.username !== "undefined" ? req.body.username : name,
    comment: req.body.comment,
    replying_to_post_id: req.body.replyingToPostID,
    board: req.body.board,
    is_author_mod: req.body.is_author_mod
  };

  if (req.body.replyingToReplyID && req.body.replyingToReplyID !== undefined) {
    data.replying_to_reply_id = req.body.replyingToReplyID;
  }

  if (req.file) {
    const file = dataUri(req).content;
    await uploader.upload(file).then((result) => {
      data.image_link = result.url;
      data.image_name = req.file.originalname;
    });
  }

  var replies = await db("replies")
    .insert(data)
    .returning("*")
    .then((res) => res);
  replies = replies[0];

  await db("posts")
    .where({ id: req.body.replyingToPostID })
    .update({ last_bump: db.fn.now() });
  await db("posts")
    .where({ id: req.body.replyingToPostID })
    .increment("replies_count", 1);

  res.json(replies);
};

const handleReplyPut = (db) => async (req, res) => {
  var reply = await db('replies')
    .where({ id: req.body.id })
    .update({ status: req.body.status })
    .returning("*")
    .then((res) => res);
  
  res.json(reply[0])
};

module.exports = {
  handleRepliesGet: handleRepliesGet,
  handleRepliesPost: handleRepliesPost,
  handleReplyPut: handleReplyPut
};
