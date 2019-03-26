import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

/**
 * TextInput.js - Returns a styled controlled text input component, with a placeholder of your choice.
 *
 * @param {string} value - The value of the text input.
 * @param {string} placeHolder - The placeholder text of the input.
 * @param {function} handleChange - A function called when the text value changes. Used to update the 'value' prop in the parent.
 */
const TextInput = ({ value, placeHolder, handleChange }) => {
  /**
   * Set the initial `react-spring` props.
   */
  const [props, set] = useSpring(() => ({ width: "0%" }));
  return (
    <Container>
      <StyledInput
        type="text"
        value={value}
        placeholder={placeHolder}
        onChange={e => {
          handleChange(e.currentTarget.value);
        }}
        onFocus={() => set({ width: "100%" })}
        onBlur={() => set({ width: "0%" })}
      />
      <ActionBar style={props} />
    </Container>
  );
};

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default TextInput;

/**
 * Define the styled components. Action bar is animated.
 */
const Container = styled.div`
  margin: 0.7rem;
  border-radius: 0.4rem;
  overflow: hidden;

  background-color: rgb(61, 61, 61);
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  background: none;

  padding: 0.5rem;
  width: 100%;

  color: white;
  font-size: 1.25rem;
  font-family: "Raleway", sans-serif;
`;

const ActionBar = styled(animated.div)`
  height:2px
  background: #d8b222;
`;
