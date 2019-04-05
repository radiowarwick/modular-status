import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import Loader from "./Loader";

/**
 * Button.js - Returns a springy animated button that invokes a function of your choice.
 *
 * @param {function} handleClick - Handler function for click events.
 * @param {string} value - Text value of the button.
 * @param {string} icon - material icon string for the button.
 * @param {bool} disabled - switch to set button to disabled mode. Does not call handleClick.
 * @param {bool} loading - defines wether the button is loading or not.
 */
const Button = ({ handleClick, value, icon, loading, disabled }) => {
  /**
   * Set initial `react-spring` props
   */
  const [props, set] = useSpring(() => ({
    transform: `translateY(0px)`,
    boxShadow: `0px 0px 0px 0px rgba(0, 0, 0, 0)`,
    config: { mass: 1, tension: 280, friction: 14 }
  }));

  /**
   * Handle setting the `react-spring` props when button state changes.
   */
  const setDown = () =>
    set({
      transform: `translateY(0px)`,
      boxShadow: `0px 0px 0px 0px rgba(0, 0, 0, 0)`
    });
  const setUp = () => {
    if (!disabled && !loading) {
      set({
        transform: `translateY(-2px)`,
        boxShadow: `0px 3px 6px 0px rgba(0, 0, 0, 0.75)`
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
      onTouchStart={setUp}
      onTouchEnd={setDown}
      onClick={disabled || loading ? null : handleClick}
      disabled={disabled}
    >
      {loading ? (
        <Loader size={0.5} />
      ) : (
        <div>
          {value ? <Text>{value}</Text> : null}
          {icon ? <Icon>{icon}</Icon> : null}
        </div>
      )}
    </Container>
  );
};

Button.propTypes = {
  value: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
};

export default Button;

/**
 * Styles for button, text and icons. Container is animated. Style is adapted by the `disabled` prop.
 */
const Container = styled(animated.div)`
  height:1.5rem;
  margin:0rem 0.7rem 0.7rem 0.7rem;
  padding: 1.1rem 0.8rem;
  background-color: var(--primary-colour);

  border-radius: 0.4rem;
  border: ${props =>
    props.disabled
      ? "0.1rem solid grey;"
      : "0.1rem solid var(--accent-colour);"} 

  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")}
  color: ${props => (props.disabled ? "grey" : "white")};

  user-select: none;
  backface-visibility:hidden;

  display:inline-flex;
  align-items:center;
`;

const Text = styled.div`
  font-family: var(--font-main);
  font-size: 1.25em;
  white-space: nowrap;
  text-overflow: clip;
`;

const Icon = styled.i`
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 1.5em;
  line-height: 1;
`;
