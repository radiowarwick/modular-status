import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    box-sizing:border-box;
    background-color: rgb(43, 43, 43);
  }
  @import url('https://fonts.googleapis.com/css?family=Lato|Raleway');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
`;

ReactDOM.render(
  <div>
    <GlobalStyles />
    <App />
  </div>,
  document.getElementById("root")
);
