import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getBoards } from "../store/actions/boards";

function Index({ boards, getBoards }) {
  useEffect(() => {
    getBoards();
  }, [boards.length, getBoards]);

  return (
    <div>
      <h1>Alexandria</h1>
      <ul>
        {boards.map((i) => {
          return (
            <li key={i.id}>
              <h3>
                <Link to={"/" + i.name}>{i.title}</Link>
              </h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  boards: state.boards,
});

export default connect(mapStateToProps, { getBoards })(Index);
