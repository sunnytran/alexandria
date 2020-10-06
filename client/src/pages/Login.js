import React from "react";
import { Link } from "react-router-dom";

import ContentBorder from "../components/content/ContentBorder";

import "../styles/main.css";

const Login = () => {
  return (
    <div class="h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono text-sm">
      <div class="container pt-5 mx-auto flex flex-col items-center justify-center">
        <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-2">
          <h1 class="font-serif text-5xl">Alexandria</h1>
        </div>
        <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12">
          <ContentBorder title="Login" borderColor="orange-300">
            <div class="flex items-center justify-center py-5">
              <div class="w-8/12">
                <input
                  class="text-black mb-4 p-2 block w-full placeholder-gray-900"
                  name="title"
                  type="text"
                  placeholder="Username"
                />
                <input
                  class="text-black mb-4 p-2 block w-full placeholder-gray-900"
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
                    <button
                      class="bg-white hover:bg-gray-200 text-black focus:outline-none px-3 py-1"
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ContentBorder>
        </div>
      </div>
    </div>
  );
};

export default Login;
