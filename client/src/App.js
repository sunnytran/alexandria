import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Board from "./Board";

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/boards").then((res) => {
        setBoards(res.data);
      });
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <h1>Alexandria</h1>
      <ul>
        {boards.map((i) => {
          return (
            <li key={i.id}>
              <h3>
                <Link to={`/${i.name}`}>
                  {i.name} - {i.title}
                </Link>
              </h3>
            </li>
          );
        })}
      </ul>

      <Switch>
        <Route path="/:boardName" component={Board} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
