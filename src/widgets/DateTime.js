import React, { useState } from "react";
import FitText from "react-fittext";
import styled from "styled-components";
import { useInterval } from "../useInterval";

/**
 * Date.js - Returns a formatted and auto-scaling date/time formatted element.
 */
const DateTime = () => {
  const [unix, setUnix] = useState(Math.floor(Date.now() / 1000));

  useInterval(() => {
    setUnix(unix + 1);
  }, 1000);

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
