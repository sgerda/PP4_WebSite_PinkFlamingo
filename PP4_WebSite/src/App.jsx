import React, { useState } from "react";
import MovieFetch from "./MovieFetch";

function App() {
  const [count, setCount] = useState(0);

  return (
    //now I need to do the rest of the genre and what not. use props for this
    <>
      
      <MovieFetch/>
    </>
  );
}

export default App;
