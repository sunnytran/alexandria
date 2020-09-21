import React from "react";

import Moment from "moment";

const PostTitle = (props) => {
  Moment.locale("en");

  return (
    <div class="flex text-lg font-semibold">
      <div class="w-1/2">
        <button onClick={props.handleShowing.bind(this)}>
          {props.isShowing ? "-" : "+"}
        </button>
        {props.title}
      </div>
      <div class="w-1/2 text-right">
        {Moment(props.date).format("M/D/yyyy")}
      </div>
    </div>
  );
};

export default PostTitle;
