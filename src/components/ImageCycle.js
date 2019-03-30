import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import { useInterval } from "../useInterval";

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
   * Define index to hold a reference to the currently displayed image.
   */
  const [index, setIndex] = useState(0);

  /**
   * Update the index over time.
   */
  useInterval(() => {
    setIndex((index + 1) % images.length);
  }, interval);

  /**
   * Define the initial animations. Start small and transparent, then full-size and opaque.
   * Will not animate if `animate` is false.
   */
  const transitions = useTransition(images[index], images[index].id, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: " scale(1)" },
    leave: { opacity: 0, transform: " scale(0.8)" },
    config: { mass: 1, tension: 230, friction: 21 },
    immediate: !animate
  });

  return transitions.map(({ item, props, key }) => (
    <Image
      key={key}
      style={{
        ...props,
        backgroundImage: `url('${item.url +
          (forceFetch ? "?force_fetch=" + Date.now() : "")}')`
      }}
    />
  ));
};

ImageCycle.propTypes = {
  interval: PropTypes.number.isRequired,
  animate: PropTypes.bool.isRequired,
  forceFetch: PropTypes.bool,
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, url: PropTypes.string }).isRequired
  ).isRequired
};

ImageCycle.defaultProps = {
  forceFetch: false
};

export default ImageCycle;

/**
 *  Define image styled. Images is a background of a div, so dynamic sizing can be acheived.
 */
const Image = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: absolute;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
