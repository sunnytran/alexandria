import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { getBoards } from "../store/actions/boards";
import { getPosts } from "../store/actions/posts";
import { getUserData } from "../store/actions/user";

import "../styles/main.css";

import Header from "../components/Header";
import ContentBorder from "../components/content/ContentBorder";
import Stats from "../components/Stats";
import PopularDisplay from "../components/PopularDisplay";

function Index({ boards, getBoards, posts, getPosts, user, getUserData }) {
  useEffect(() => {
    getBoards();
    getPosts();
    if (user.username === undefined) getUserData();
  }, [boards.length, getBoards, posts.length, getPosts, user, getUserData]);

  var categories = [];
  for (var i = 0; i < boards.length; i++)
    if (!categories.includes(boards[i].category))
      categories.push(boards[i].category);

  return (
    <div class="h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono text-sm">
      {user.username === undefined ? (
        <Redirect to="/login" />
      ) : (
        <div class="container mx-auto pt-5 pb-5">
          <Header />
          <div class="flex space-x-5">
            <div class="w-1/5 space-y-5">
              <Stats />
            </div>

            <div class="w-4/5 space-y-5">
              <ContentBorder title="About" borderColor="orange-300">
                Alexandria is a simple imageboard clone where you can post
                comments and share images. There are boards dedicated to a
                variety of topics that you can participate in without needing to
                register for an account!
                <br />
                <a
                  class="no-underline text-blue-500 hover:underline hover:text-white"
                  href="https://github.com/sunnytran"
                  target="_blank"
                >
                  My GitHub
                </a>
              </ContentBorder>
              <ContentBorder title="Boards">
                <div class="flex">
                  {categories.map((i) => {
                    return (
                      <div key={i} class="flex-1">
                        <span class="font-bold underline">{i}</span>
                        <ul>
                          {boards
                            .filter((j) => j.category === i)
                            .map((j) => {
                              return (
                                <li key={j.id}>
                                  <Link
                                    class="no-underline text-blue-500 hover:underline hover:text-white"
                                    to={"/" + j.name}
                                  >
                                    {j.title}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </ContentBorder>

              <ContentBorder title="Popular">
                <PopularDisplay posts={posts} />
              </ContentBorder>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  boards: state.boards,
  posts: state.posts,
  user: state.user,
});

export default connect(mapStateToProps, { getBoards, getPosts, getUserData })(
  Index
);
