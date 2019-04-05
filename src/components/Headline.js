import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Headline.js: A component which returns an underlined headline text.
 *
 * @param {string} value - The big important text to be displayed.
 * @param {number} fontSize - The size of the font in rem.
 */
const Headline = ({ value, fontSize }) => {
  return (
    <Container fontSize={fontSize}>
      {value}
      <hr />
    </Container>
  );
};

Headline.propTypes = {
  value: PropTypes.string.isRequired,
  fontSize: PropTypes.number
};

export default Headline;

/**
 * A simple `div` which set font parameters and styles the horizontal rule.
 * Accepts a `margin` property.
 */
const Container = styled.div`
  margin: 0.5rem;

  font-family: var(--font-heading);
  color: var(--secondary-colour);
  font-size: ${props => (props.fontSize ? props.fontSize : "2")}rem;

  hr {
    margin-top: 0.2em;
    border: 1px solid #d8b222;
  }
`;
