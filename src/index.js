import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato|Raleway');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  :root {
    --primary-colour: rgb(61, 61, 61);
    --seconday-colour: rgb(255,255,255);
    --accent-colour: rgb(216,178,34);
    --background-colour: rgb(43,43,43);

    --font-heading: "Lato", sans-serif;
    --font-main: "Raleway", sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: rgb(43, 43, 43);
  }
  * {
    box-sizing:border-box;
  }
`;

ReactDOM.render(
  <div>
    <GlobalStyles />
    <App />
  </div>,
  document.getElementById("root")
);
