var adjectives = require("../utils/adjectives");
var animals = require("../utils/animals");
var seedrandom = require("seedrandom");
var stringUtils = require("../utils/stringUtils");

const handleRepliesGet = (db) => async (req, res) => {
  const replies = await db("replies").where(req.query);
  res.json(replies);
};

const handleRepliesPost = (db, dataUri, uploader) => async (req, res) => {
  var postID = req.body.replyingToPostID;
  seedrandom(req.ip + "/" + postID, { global: true });
  var name =
    stringUtils.capitalize(
      adjectives[Math.floor(Math.random() * adjectives.length)]
    ) +
    stringUtils.capitalize(
      adjectives[Math.floor(Math.random() * adjectives.length)]
    ) +
    stringUtils.capitalize(animals[Math.floor(Math.random() * animals.length)]);

  data = {
    username: name,
    comment: req.body.comment,
    replying_to_post_id: req.body.replyingToPostID,
    board: req.body.board,
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

module.exports = {
  handleRepliesGet: handleRepliesGet,
  handleRepliesPost: handleRepliesPost,
};
