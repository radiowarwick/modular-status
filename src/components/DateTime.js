import React from "react";
import PropTypes from "prop-types";
import FitText from "react-fittext";
import styled from "styled-components";

/**
 * Date.js - Returns a formatted and auto-scaling date/time formatted element.
 *
 * @param {number} unix - The unix time (seconds) to convert to date/time.
 */
const DateTime = ({ unix }) => {
  const date = new Date(unix * 1000);

  return (
    <Container>
      <FitText compressor={0.7}>
        <div>{date.toLocaleTimeString("en-GB")}</div>
      </FitText>
      <FitText compressor={1}>
        <div>{date.toDateString()}</div>
      </FitText>
    </Container>
  );
};

DateTime.propTypes = {
  unix: PropTypes.number.isRequired
};

export default DateTime;

/**
 * Styles, giving a monospace font to prevent movement of text between updates.
 */
const Container = styled.div`
  font-family: monospace;
  color: var(--accent-colour);
  text-align: center;
  user-select: none;
`;
