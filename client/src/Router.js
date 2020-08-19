import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import Index from "./pages/Index";
import Board from "./pages/Board";

const Root = () => {
  return (
    <div>
      <Switch>
        <Route component={Index} exact path="/" />
        <Route path="/:boardName" component={Board} />
      </Switch>
    </div>
  );
};

export default Root;
