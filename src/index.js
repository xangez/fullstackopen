import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import axios from "axios";

axios.get("http://localhost:3001/notes").then((response) => {
  const notes = response.data;
  console.log(notes);
});

ReactDOM.render(<App />, document.getElementById("root"));
