import React from "react";

const ContentBorder = (props) => {
  const borderColor = props.borderColor ? props.borderColor : "white";
  // const textColor = props.textColor ? props.textColor : "black";

  return (
    <div
      class={"border border-l-2 border-b-2 border-r-2 border-" + borderColor}
    >
      <div class={"text-black bg-" + borderColor}>
        <div class="mx-2">{props.title}</div>
      </div>
      <div class="p-2">{props.children}</div>
    </div>
  );
};

export default ContentBorder;
