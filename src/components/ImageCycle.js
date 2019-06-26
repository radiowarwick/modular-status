import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import { useCycle } from "../customHooks";
import { GlobalAnimateContext } from "../App";
import image_error from "../images/image_error.jpg";
import ReactImageFallback from "react-image-fallback";
import Loader from "./Loader";

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
   * Selects the current image based on a cycling hook.
   */
  const currentImage = useCycle(images, { id: "", url: "" }, interval);

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
    <Container key={key} style={props}>
      <ReactImageFallback
        src={item.url + (forceFetch ? "?force_fetch=" + Date.now() : "")}
        fallbackImage={[image_error, <div />]}
        alt="Nothing to show..."
      />
    </Container>
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
 * Define a container to hold any image at a fixed 16:9 aspect ratio.
 *
 * The padding-top rule gives the div artificial fixed height based of the component's width.
 */
const Container = styled(animated.div)`
  width: calc(100% - 1.6rem);

  padding-top: calc(56.25% - 1.6rem);
  margin: 0 0.8rem;

  position: absolute;
  overflow: hidden;

  border-color: var(--accent-colour);
  border-style: solid;
  border-radius: 0.9rem;

  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);

  img:first-of-type {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
`;

/**
 *  Define a styled image.
 *
 *  The image is positioned centrally within the parent div, and fills it's width.
 */
const Image = styled.img``;
