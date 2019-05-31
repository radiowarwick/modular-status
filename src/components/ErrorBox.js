import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * ErrorBox.js - A error box, displaying a large scary X, and some useful error text underneath.
 *
 * Message is center aligned, and there is no requirement to have a verbose message passed down.
 */
const ErrorBox = ({ message }) => {
  return (
    <ErrorContainer>
      <Cross />
      <Message>Error</Message>
      <Verbose>{message}</Verbose>
    </ErrorContainer>
  );
};

ErrorBox.propTypes = {
  message: PropTypes.string
};

export default ErrorBox;

/**
 * Define styles. Contain the error text with a big red cross and central text.
 */

const ErrorContainer = styled.div`
  text-align: center;
  color: var(--secondary-colour);
  font-family: monospace;
  user-select: none;
`;

const Cross = styled.div`
  font-size: 5rem;
  color: crimson;
  line-height: 0.8;

  &:after {
    content: "X";
  }
`;

const Message = styled.div`
  font-size: 2rem;
`;

const Verbose = styled.div`
  font-size: 0.75rem;
`;
