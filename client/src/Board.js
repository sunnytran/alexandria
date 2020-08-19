import React from "react";

const Board = ({ match, location }) => {
  const {
    params: { boardName },
  } = match;

  return <h1>{boardName}</h1>;
};

export default Board;
