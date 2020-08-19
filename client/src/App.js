import React, { useState, useEffect } from "react";

import axios from "axios";

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
    <div>
      <h1>Alexandria</h1>
      <ul>
        {boards.map((i) => {
          return (
            <li key={i.id}>
              <h3>
                {i.name} - {i.title}
              </h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
