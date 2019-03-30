import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Loader.js - Returns a selection of springy floaty loading dots of a given size;
 *
 * @param {float} size - The size of the loader in Root Font Size Units. Responsive.
 */
const Loader = ({ size }) => {
  return (
    <Container>
      <Dot size={size} />
      <Dot size={size} delay={0.16} />
      <Dot size={size} delay={0.32} />
    </Container>
  );
};

Loader.propTypes = {
  size: PropTypes.number.isRequired
};

export default Loader;

/**
 * Defines styles. A container that defines the animation keyframes and set flex display.
 */
const Container = styled.div`
  display: flex;

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
`;

/**
 * The springy dots of the loader. `Size and spacing is defined from the `size` prop.
 * The delay between each dot's spring is defined from the `delay` prop.
 */
const Dot = styled.div`
  height: ${props => (props.size ? props.size : 0)}em;
  width: ${props => (props.size ? props.size : 0)}em;
  margin: 0 ${props => (props.size ? props.size / 3 : 0)}em;

  background-color: var(--accent-colour);
  border-radius: 100%;

  animation: bounce 1.4s infinite ease-in-out both;
  animation-delay: ${props => (props.delay ? props.delay : "0")}s;
`;
