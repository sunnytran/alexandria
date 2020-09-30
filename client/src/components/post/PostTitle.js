import React from "react";
import { Link } from "react-router-dom";

import Moment from "moment";

const PostTitle = (props) => {
  Moment.locale("en");

  return (
    <div class="flex font-semibold">
      <div class="w-1/6">
        <button
          class="font-bold border-none focus:outline-none"
          onClick={props.handleShowing}
        >
          {props.isShowing ? "-" : "+"}
        </button>
      </div>
      <div class="flex-1 text-center">
        <Link
          class="no-underline hover:underline"
          to={"/" + props.board + "/" + props.id}
        >
          {props.title}
        </Link>
      </div>
      <div class="w-1/6 text-right">
        {Moment(props.date).format("M/D/yyyy")}
      </div>
    </div>
  );
};

export default PostTitle;
