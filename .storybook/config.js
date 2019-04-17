import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { createGlobalStyle } from "styled-components";
import requireContext from "require-context.macro";
import { setConsoleOptions } from "@storybook/addon-console";
import { withA11y } from "@storybook/addon-a11y";

setConsoleOptions({
  panelExclude: []
});

/**
 * Define some global styles.
 */
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato|Raleway');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  :root {
    --primary-colour: rgb(61, 61, 61);
    --secondary-colour: rgb(255,255,255);
    --accent-colour: rgb(221, 180, 34);
    --background-colour: rgb(43,43,43);

    --font-heading: "Lato", sans-serif;
    --font-main: "Raleway", sans-serif;
  }
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
    @media (max-width: 1024px) {
      font-size:12px;
    }
  }
  * {
    box-sizing:border-box;
  }
`;

/**
 * Point to ALL stories files.
 */
const req = requireContext("../src", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(s => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

addDecorator(withA11y);

addParameters({
  backgrounds: [
    { name: "dark", value: "#2b2b2b", default: true },
    { name: "light", value: "#FFF" }
  ]
});

configure(loadStories, module);
