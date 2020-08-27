import React from "react";

const Reply = ({ replyContent }) => {
  return (
    <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
      <div style={{ display: "inline" }}>
        <b>{replyContent.username}</b>
        &nbsp;
        <button>Reply</button>
      </div>
      <br />
      {replyContent.date}
      <br />
      {replyContent.comment}
    </div>
  );
};

export default Reply;
