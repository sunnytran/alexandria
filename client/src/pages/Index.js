import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getBoards } from "../store/actions/boards";

import "../styles/main.css";
import Header from "../components/Header";
import ContentBorder from "../components/ContentBorder";

function Index({ boards, getBoards }) {
  useEffect(() => {
    getBoards();
  }, [boards.length, getBoards]);

  return (
    <div class="h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono">
      <div class="container mx-auto pt-5">
        <Header />

        <div class="flex space-x-5">
          <div class="w-1/5 space-y-5">
            <ContentBorder title="Search">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="searchTitle"
                type="text"
                placeholder="Search titles..."
              />
            </ContentBorder>

            <ContentBorder title="Stats">Stats go here</ContentBorder>
          </div>

          <div class="w-4/5 space-y-5">
            <ContentBorder title="About" borderColor="orange-200">
              Alexandria is a simple imageboard clone where you can post
              comments and share images. There are boards dedicated to a variety
              of topics that you can participate in without needing to register
              for an account!
            </ContentBorder>

            <ContentBorder title="Boards">
              <ul>
                {boards.map((i) => {
                  return (
                    <li key={i.id}>
                      <Link
                        class="no-underline text-blue-500 hover:underline hover:text-white"
                        to={"/" + i.name}
                      >
                        {i.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </ContentBorder>

            <ContentBorder title="Popular">Popular posts go here</ContentBorder>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  boards: state.boards,
});

export default connect(mapStateToProps, { getBoards })(Index);
