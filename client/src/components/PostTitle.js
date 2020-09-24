import React from "react";
import { Link } from "react-router-dom";

import Moment from "moment";

const PostTitle = (props) => {
  Moment.locale("en");

  return (
    <div class="flex text-sm font-semibold">
      <div class="w-1/5">
        <button
          class="font-bold border-none focus:outline-none"
          onClick={props.handleShowing}
        >
          {props.isShowing ? "-" : "+"}
        </button>
      </div>
      <div class="w-3/5 text-center">
        <Link
          class="no-underline hover:underline"
          to={"/" + props.board + "/" + props.id}
        >
          {props.title}
        </Link>
      </div>
      <div class="w-1/5 text-right">
        {Moment(props.date).format("M/D/yyyy")}
      </div>
    </div>
  );
};

export default PostTitle;
