import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Index from "./pages/Index";
import Board from "./pages/Board";

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/:boardName" component={Board} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
