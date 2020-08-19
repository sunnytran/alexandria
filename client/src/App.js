import React, { useState, useEffect } from "react";

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/boards")
        .then((res) => res.json())
        .then((res) => {
          setBoards(res);
        })
        .catch((error) => console.log(error));
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
