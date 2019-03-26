import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Headline.js: A component which returns an underlined headline text.
 *
 * @param {string} value - The big important text to be displayed.
 */
const Headline = ({ value }) => {
  return (
    <Container margin="1rem">
      {value}
      <hr />
    </Container>
  );
};

Headline.propTypes = {
  value: PropTypes.string.isRequired
};

export default Headline;

/**
 * A simple `div` which set font parameters and styles the horizontal rule.
 * Accepts a `margin` property.
 */
const Container = styled.div`
  margin: ${props => (props.margin ? props.margin : "0")};

  font-family: "Lato", sans-serif;
  color: white;
  font-size: 2em;

  background-color: rgb(43, 43, 43);

  hr {
    margin-top: 0.2em;
    border: 1px solid #d8b222;
  }
`;
