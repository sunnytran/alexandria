import React, { useState } from "react";

const ReplyForm = () => {
  return (
    <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
      <form>
        <label>Image</label>
        <input type="file" name="image" />
        <br />
        <label>Comment</label>
        <br />
        <textarea name="comment" rows="5" cols="50" />
        <br />
        <input type="submit" value="Post" />
      </form>
    </div>
  );
};

export default ReplyForm;
