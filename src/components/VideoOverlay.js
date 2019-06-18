import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ErrorBox from "./ErrorBox";

/**
 * VideoOverlay.js - A component that returns a full-screen video with an opaque background.
 *
 * When the video ends, it invokes a function that you pass with `handleEnded`.
 *
 * If the video cannot play, an error message will show and `handleEnded` will be invoked after 30 seconds.
 *
 * @params {string} src - The URL of the video to be played.
 * @params {func} handleEnded - The function to be invoked after playback (or after synthetic delay from error).
 */
const VideoOverlay = ({ src, handleEnded }) => {
  /**
   * Define if the overlay is in an error state, false by default.
   */
  const [error, setError] = useState(false);

  /**
   * If an error occurs before or during playback, set the overlay to an error state.
   * After 30 seconds, invoke the handleEnded event. In this way, the component will always
   * call the function, despite errors.
   */
  const handleError = () => {
    setError(true);
    window.setTimeout(handleEnded, 30000);
  };

  /**
   * If in error state, display an error box.
   * Else, play the video, invoking ``handleEnded` when finished.
   */
  return (
    <Container>
      {error ? (
        <ErrorBox message={"Cannot Display Video..."} />
      ) : (
        <VideoElement
          src={src}
          onEnded={handleEnded}
          onError={handleError}
          autoPlay
          muted
        />
      )}
    </Container>
  );
};

VideoOverlay.propTypes = {
  src: PropTypes.string.isRequired,
  handleEnded: PropTypes.func.isRequired
};

export default VideoOverlay;

/**
 * Define styles. Position content in the center of an opaque background.
 * Scale the video to fit the parent in all dimensions. No cropping.
 */
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-colour);
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
`;
