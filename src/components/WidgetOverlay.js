import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "./Loader";
import ErrorBox from "./ErrorBox";

/**
 * WidgetOverlay.js - Returns an overlay for all widgets. Can be in an error or loading state (or neither, but not both).
 *
 * The widget gradually fades out (`HideBar`) towards the bottom to cope with overflow nicely.
 *
 * @params {object} error - Defines if the widget is in an error state.
 * @params {bool} loading - Defines if the widget is in a loading state.
 */
const WidgetOverlay = ({ error, loading }) => {
  return (
    <Container>
      <Display>
        {error ? (
          <ErrorBox message={error.message} />
        ) : loading ? (
          <Loader size={1.5} />
        ) : null}
      </Display>
      <HideBar />
    </Container>
  );
};

WidgetOverlay.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool
};

export default WidgetOverlay;

/**
 * Define styles. Positioned to be the layer above the widget.
 */

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 98;
`;

const Display = styled.div`
  width: 100%;
  height: calc(100% - 1rem);

  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * A small bar that sits at the bottom of the widget, which applies a gradual fade to the widget.
 * Uses a linear gradient from transparent ==> the background colour.
 */
const HideBar = styled.div`
  background-image: linear-gradient(
    rgba(0, 0, 0, 0),
    var(--background-colour) 80%
  );
  height: 1rem;
`;
