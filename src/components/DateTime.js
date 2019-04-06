import React, { useState, useEffect } from "react";
import FitText from "react-fittext";
import styled from "styled-components";
import { useInterval } from "../useInterval";
import PropTypes from "prop-types";

/**
 * Date.js - Returns a formatted and auto-scaling date/time formatted element.
 *
 * @param {number} unixStart - The start time to begin counting from.
 */
const DateTime = ({ unixStart }) => {
  const [unix, setUnix] = useState(unixStart);

  useInterval(() => {
    setUnix(unix + 1);
  }, 1000);

  useEffect(() => {
    setUnix(unixStart);
  }, [unixStart]);

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
  unixStart: PropTypes.number.isRequired
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
