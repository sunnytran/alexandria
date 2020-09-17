import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getBoards } from "../store/actions/boards";

import "../styles/main.css";

function Index({ boards, getBoards }) {
  useEffect(() => {
    getBoards();
  }, [boards.length, getBoards]);

  return (
    <div class="h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono">
      <div class="container mx-auto">
        <div class="flex">
          <div class="w-1/5"></div>
          <div class="w-4/5 ml-5">
            <h1 class="font-serif text-4xl pt-5">Alexandria</h1>
          </div>
        </div>

        <div class="flex space-x-5">
          <div class="w-1/5 space-y-5">
            <div class="border border-l-2 border-b-2 border-r-2 border-white">
              <div class="bg-white text-black text-xl">
                <div class="mx-2">Search</div>
              </div>
              <div class="p-2">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="searchTitle"
                  type="text"
                  placeholder="Search titles..."
                />
              </div>
            </div>

            <div class="border border-l-2 border-b-2 border-r-2 border-white">
              <div class="bg-white text-black text-xl">
                <div class="mx-2">Stats</div>
              </div>
              <div class="p-2">Stats go here</div>
            </div>
          </div>

          <div class="w-4/5 space-y-5">
            <div class="border border-l-2 border-b-2 border-r-2 border-orange-200">
              <div class="bg-orange-200 text-black text-xl">
                <div class="mx-2">About</div>
              </div>
              <div class="p-2">
                Alexandria is a simple imageboard clone where you can post
                comments and share images. There are boards dedicated to a
                variety of topics that you can participate in without needing to
                register for an account!
              </div>
            </div>

            <div class="border border-l-2 border-b-2 border-r-2 border-white">
              <div class="bg-white text-black text-xl">
                <div class="mx-2">Boards</div>
              </div>
              <div class="p-2">
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
              </div>
            </div>

            <div class="border border-l-2 border-b-2 border-r-2 border-white">
              <div class="bg-white text-black text-xl">
                <div class="mx-2">Popular</div>
              </div>
              <div class="p-2">Popular posts go here</div>
            </div>
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
