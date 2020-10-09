import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getBoards } from "../store/actions/boards";

const BoardsNav = ({ boards, getBoards }) => {
  useEffect(() => {
    getBoards();
  }, [boards.length, getBoards]);

  return (
    <div class="flex space-x-1 justify-center">
      [
      <a
        class="no-underline text-orange-300 hover:underline hover:text-white"
        href="/"
      >
        Home
      </a>
      &nbsp;/
      {boards.map((i) => {
        return (
          <div key={i.name}>
            <a
              class="no-underline text-blue-500 hover:underline hover:text-white"
              href={"/" + i.name}
            >
              {i.name}
            </a>
            {boards.indexOf(i) !== boards.length - 1 ? " / " : ""}
          </div>
        );
      })}
      ]
    </div>
  );
};

const mapStateToProps = (state) => ({
  boards: state.boards,
});

export default connect(mapStateToProps, {
  getBoards,
})(BoardsNav);
