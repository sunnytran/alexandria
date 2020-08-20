import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getBoard } from "../store/actions/board";

const Board = ({ match, location, board, getBoard }) => {
  const {
    params: { boardName },
  } = match;

  useEffect(() => {
    getBoard(boardName);

    console.log(board);
  });

  return (
    <div>
      <h1>Alexandria</h1>
      <ul>
        {/* {board.map((i) => {
          return (
            <li key={i.id}>
              <h3>
                <Link to={`/${i.name}`}>{i.title}</Link>
              </h3>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
});

export default connect(mapStateToProps, { getBoard })(Board);
