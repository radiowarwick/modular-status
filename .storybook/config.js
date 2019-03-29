import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { createGlobalStyle } from "styled-components";
import requireContext from "require-context.macro";

/**
 * Define some global styles.
 */
const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    box-sizing:border-box;
  }
  @import url('https://fonts.googleapis.com/css?family=Lato|Raleway');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
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

addParameters({
  backgrounds: [
    { name: "dark", value: "#2b2b2b", default: true },
    { name: "light", value: "#FFF" }
  ]
});

configure(loadStories, module);
