import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import { useInterval } from "../useInterval";
import { GlobalAnimateContext } from "../App";

/**
 * ImageCycle.js - Returns an infinite cycle of images, that can animate if you like.
 *
 * @param {number} interval - The interval at which the images update.
 * @param {bool} animate - Defines if the components should animate.
 * @param {bool} forceFetch - Defines if the images should be fetched from server each time.
 * @param {array} images - The array of images to display.
 */
const ImageCycle = ({ interval, animate, forceFetch, images }) => {
  /**
   * Extract a boolean value from the global animation context.
   */
  const globalAnimate = useContext(GlobalAnimateContext);

  /**
   * Define index to hold a reference to the currently displayed image.
   */
  const [index, setIndex] = useState(0);

  /**
   * Update the index over time.
   * If there are no images to display, then set index to be zero, triggering a re-render and halting the cycle.
   */
  useInterval(() => {
    setIndex(images.length > 0 ? (index + 1) % images.length : 0);
  }, interval);

  /**
   * Set the current image to display, falling back to a default if there are no images to show.
   */
  const currentImage = images.length > 0 ? images[index] : { id: "", url: "" };

  /**
   * Define the initial animations. Start small and transparent, then full-size and opaque.
   * Will not animate if `animate` is false.
   */
  const transitions = useTransition(currentImage, currentImage.id, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: " scale(1)" },
    leave: { opacity: 0, transform: " scale(0.8)" },
    config: { mass: 1, tension: 230, friction: 21 },
    immediate: !globalAnimate || !animate
  });

  return transitions.map(({ item, props, key }) => (
    <Image
      key={key}
      src={item.url + (forceFetch ? "?force_fetch=" + Date.now() : "")}
      alt="Nothing to show..."
      style={props}
    />
  ));
};

ImageCycle.propTypes = {
  interval: PropTypes.number.isRequired,
  animate: PropTypes.bool.isRequired,
  forceFetch: PropTypes.bool,
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, url: PropTypes.string })
  ).isRequired
};

ImageCycle.defaultProps = {
  forceFetch: false
};

export default ImageCycle;

/**
 *  Define a styled image.
 */
const Image = styled(animated.img)`
  width: calc(100% - 1.6rem);
  margin: 0 0.8rem;
  position: absolute;

  border-color: var(--accent-colour);
  border-style: solid;
  border-radius: 0.9rem;

  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
`;
