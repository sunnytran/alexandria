import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getUserData } from "../store/actions/user";

import ContentBorder from "../components/content/ContentBorder";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import "../styles/main.css";

const Login = ({ user, getUserData }) => {
  useEffect(() => {
    getUserData();
  }, [user, getUserData]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!e.target.username) toast("Please enter a username");
    if (!e.target.password) toast("Please enter a password");

    if (e.target.username && e.target.password) {
      axios
        .post(
          "/login",
          {
            username: e.target.username.value,
            password: e.target.password.value,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data === "Incorrect username/password")
            toast("Incorrect username/password");
          localStorage.setItem("token", res.data.token);
        });
    }

    e.target.username.value = "";
    e.target.password.value = "";
  };

  return (
    <div class="h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono text-sm">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
        transition={Slide}
      />

      <div class="container pt-5 mx-auto flex flex-col items-center justify-center">
        <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-2">
          <h1 class="font-serif text-5xl">Alexandria</h1>
        </div>
        <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12">
          <ContentBorder title="Login" borderColor="orange-300">
            <div class="flex items-center justify-center py-5">
              <div class="w-8/12">
                <form onSubmit={handleLogin.bind(this)}>
                  <input
                    class="text-black mb-4 p-2 block w-full placeholder-gray-900"
                    name="username"
                    type="text"
                    placeholder="Username"
                  />
                  <input
                    class="text-black mb-4 p-2 block w-full placeholder-gray-900"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <div class="flex">
                    <div class="flex-1">
                      <Link
                        class="no-underline text-blue-500 hover:underline hover:text-white"
                        to="/index"
                      >
                        Continue as guest
                      </Link>
                    </div>
                    <div>
                      <input
                        class="bg-white hover:bg-gray-200 text-black focus:outline-none px-3 py-1"
                        type="submit"
                        value="Log in"
                      ></input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </ContentBorder>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getUserData,
})(Login);
