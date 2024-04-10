import React, { useState } from "react";
import MovieFetch from "./MovieFetch";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Populars</h1>
      <MovieFetch/>
    </>
  );
}

export default App;
