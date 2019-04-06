import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "./Loader";

const WidgetOverlay = ({ error, loading }) => {
  return (
    <div style={{ height: "100%" }}>
      {error ? (
        <Display>
          <Cross />
          <Message>{error.message}</Message>
        </Display>
      ) : loading ? (
        <Display>
          <Loader size={1.5} />
        </Display>
      ) : null}
      <HideBar />
    </div>
  );
};

WidgetOverlay.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool
};

export default WidgetOverlay;

const Display = styled.div`
  width: 100%;
  height: calc(100% - 1rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Cross = styled.div`
  font-size: 5rem;
  color: crimson;
  font-family: var(--font-main);

  &:after {
    content: "X";
  }
`;

const Message = styled.div`
  font-size: 2rem;
  color: var(--secondary-colour);
  font-family: var(--font-heading);
`;

const HideBar = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0), var(--background-colour));
  height: 1rem;
`;
