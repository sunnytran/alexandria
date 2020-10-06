import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Index from "./pages/Index";
import Board from "./pages/Board";
import Post from "./pages/PostPage";

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/index" component={Index} />
        <Route path="/:boardName/:postID" component={Post} />
        <Route path="/:boardName" component={Board} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
