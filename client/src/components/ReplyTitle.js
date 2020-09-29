import React from "react";
import { Link } from "react-router-dom";

const ReplyTitle = (props) => {
  return (
    <div class="flex font-semibold">
      <div class="w-1/5">
        <button
          class="font-bold border-none focus:outline-none"
          //   onClick={props.handleShowing}
        >
          X
        </button>
      </div>
      <div class="w-3/5 text-center">{"Re:" + props.title}</div>
    </div>
  );
};

export default ReplyTitle;
