import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";

function Index() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/api/v1/boards").then((res) => {
        setBoards(res.data);
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Alexandria</h1>
      <ul>
        {boards.map((i) => {
          return (
            <li key={i.id}>
              <h3>
                <Link to={`/${i.name}`}>{i.title}</Link>
              </h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Index;
