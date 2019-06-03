import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Lato|Raleway|Roboto+Mono');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
:root {
  --primary-colour: rgb(61, 61, 61);
  --secondary-colour: rgb(255,255,255);
  --accent-colour: rgb(221, 180, 34);
  --background-colour: rgb(43,43,43);

  --font-heading: "Lato", sans-serif;
  --font-main: "Raleway", sans-serif;
  --font-mono: "Roboto Mono", monospace;
}
body, html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: var(--background-colour);
  font-size: calc(12px + 0.2vw);
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
