import React from "react";

import Moment from "moment";

const PostTitle = (props) => {
  Moment.locale("en");

  return (
    <div class="flex text-sm font-semibold">
      <div class="w-1/3">
        <button
          class="font-bold border-none focus:outline-none"
          onClick={props.handleShowing}
        >
          {props.isShowing ? "-" : "+"}
        </button>
      </div>
      <div class="w-1/3 text-center">{props.title}</div>
      <div class="w-1/3 text-right">
        {Moment(props.date).format("M/D/yyyy")}
      </div>
    </div>
  );
};

export default PostTitle;
