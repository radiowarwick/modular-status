import { configure, addDecorator } from "@storybook/react";
import requireContext from "require-context.macro";
import { createGlobalStyle } from "styled-components";
import React from "react";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
  }
  @import url('https://fonts.googleapis.com/css?family=Lato|Raleway');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
`;

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

configure(loadStories, module);
