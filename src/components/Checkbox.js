import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Checkbox.js -
 */
const Checkbox = ({ isChecked, value, handleChange }) => {
  return (
    <Container>
      <InputBox type="checkbox" onChange={handleChange} checked={isChecked} />
      <Value>{value}</Value>
    </Container>
  );
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Checkbox;

const Container = styled.div`
  margin: 0rem 0.7rem 0.7rem 0.7rem;
`;

const Value = styled.label`
  color: var(--secondary-colour);
  font-family: var(--font-main);
`;

const InputBox = styled.input`
  width: 0.75rem;
  cursor: pointer;
`;
