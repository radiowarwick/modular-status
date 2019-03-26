import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

/**
 * Button.js - Returns a springy animated button that invokes a function of your choice.
 *
 * @param {function} handleClick - Handler function for click events.
 * @param {string} value - Text value of the button.
 * @param {string} icon - material icon string for the button.
 * @param {bool} disabled - switch to set button to disabled mode. Does not call handleClick.
 */
const Button = ({ handleClick, value, icon, disabled }) => {
  /**
   * Set initial `react-spring` props
   */
  const [props, set] = useSpring(() => ({
    transform: `scale(1)`,
    boxShadow: `0px 0px 0px 0px rgba(0, 0, 0, 0)`,
    config: { mass: 1.2, tension: 730, friction: 19 }
  }));

  /**
   * Handle setting the `react-spring` props when button state changes.
   */
  const setDown = () =>
    set({
      transform: `scale(1)`,
      boxShadow: `0px 0px 0px 0px rgba(0, 0, 0, 0)`
    });
  const setUp = () => {
    if (!disabled) {
      set({
        transform: `scale(1.03)`,
        boxShadow: `0px 0px 8px 0px rgba(0, 0, 0, 0.75)`
      });
    }
  };

  return (
    <Container
      style={props}
      onMouseEnter={setUp}
      onMouseLeave={setDown}
      onMouseUp={setUp}
      onMouseDown={setDown}
      onClick={disabled ? null : handleClick}
      disabled={disabled}
    >
      {value ? <Text>{value}</Text> : null}
      {icon ? <Icon>{icon}</Icon> : null}
    </Container>
  );
};

Button.propTypes = {
  key: PropTypes.string.isRequired,
  data: PropTypes.shape({
    value: PropTypes.string,
    tag: PropTypes.string,
    disabled: PropTypes.bool,
    handleClick: PropTypes.func.isRequired
  })
};

export default Button;

/**
 * Styles for button, text and icons. Container is animated. Style is adapted by the `disabled` prop.
 */
const Container = styled(animated.div)`
  margin: 0.7rem;
  padding: 0.45rem 0.9rem;
  background-color: rgb(61, 61, 61);

  border-radius: 0.4rem;
  border: ${props => (props.disabled ? "2px solid grey" : "2px solid #d8b222")} 

  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")}
  color: ${props => (props.disabled ? "grey" : "white")};

  user-select: none;
  display:inline-flex;
`;

const Text = styled.div`
  font-family: "Raleway", sans-serif;
  font-size: 1.25em;
`;

const Icon = styled.i`
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 1.5em;
  line-height: 1;
`;
