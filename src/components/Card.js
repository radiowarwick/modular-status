import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { GlobalAnimateContext } from "../App";

/**
 * Card.js: A component which returns an 'information' card, with either an image or a text `tag` (limited to three characters) or both.
 *
 * @param {object} data - An object which defines the data to display in the card.
 * @param {bool} slim - Define if the card should be slim. Or not.
 * @param {bool} colourful - Define if the card should use the image to make a dynamic background.
 * @param {bool} dark - Defines if the card should take on a 'darkened' apperance.
 */
const Card = ({ data, slim, colourful, dark }) => {
  /**
   * Extract a boolean value from the global animation context.
   */
  const globalAnimate = useContext(GlobalAnimateContext);

  const props = {
    container: useSpring({
      height: slim ? "6rem" : "8rem",
      immediate: !globalAnimate
    }),
    hero: useSpring({
      width: slim ? "6rem" : "8rem",
      backgroundColor: dark
        ? "var(--background-colour)"
        : "var(--accent-colour)",
      immediate: !globalAnimate
    }),
    tag: useSpring({
      fontSize: slim ? "2.75rem" : "3.75rem",
      color: dark ? "var(--accent-colour)" : "var(--primary-colour)",
      immediate: !globalAnimate
    }),
    content: useSpring({
      lineHeight: slim ? "1" : "1.25",
      immediate: !globalAnimate
    })
  };

  return (
    <Container style={props.container}>
      {!data.imageURL && !data.tag ? null : (
        <Hero style={props.hero}>
          {data.imageURL ? (
            <HeroImage src={data.imageURL} alt={data.title} />
          ) : null}
          {data.tag ? (
            <HeroTag style={props.tag}>{data.tag.substring(0, 3)}</HeroTag>
          ) : null}
        </Hero>
      )}
      <Content style={props.content}>
        <Title>{data.title}</Title>
        <Subtitle>{data.subtitle}</Subtitle>
      </Content>
      {colourful && data.imageURL ? (
        <Colourful imageurl={data.imageURL} />
      ) : null}
    </Container>
  );
};

Card.propTypes = {
  slim: PropTypes.bool.isRequired,
  colourful: PropTypes.bool.isRequired,
  dark: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    tag: PropTypes.string,
    imageURL: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string
  }).isRequired
};

export default Card;

/**
 * Container to hold hero and text elements.
 * Uses CSS flexbox to position children as a dynamic row.
 */
const Container = styled(animated.div)`
  min-width: 8rem;
  position: relative
  margin: 0 1rem 1rem 1rem;

  background-color: var(--primary-colour);
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
  border-radius: 0.6rem;

  font-family: var(--font-heading);
  color: var(--secondary-colour);

  display: flex;

  user-select: none;
  overflow: hidden;
  backface-visibility: hidden;
`;

/**
 * Element which holds either an image or a 'tag' text with yellow background.
 * Uses CSS Flexbox to position the tag text perfectly central to the parent.
 */
const Hero = styled(animated.div)`
  height: 100%;
  background-color: var(--accent-colour);

  z-index: 99;

  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

/**
 * Ensure the hero image fills the full hero parent.
 */
const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/**
 * Contains the content of the card, pushed over to the right.
 * Uses CSS text-overflow and CSS Flexbox to allow text truncation.
 */
const Content = styled(animated.div)`
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;

  z-index: 99;

  min-width: 0;

  div {
    white-space: nowrap;
    text-overflow: clip;
  }
`;

/**
 * Adds a colourful plate thingy underneath the hero and content.
 * Uses the image to make a large, blurred frosted-glass like appearance.
 */
const Colourful = styled.div`
  width:100%;
  height:100%;

  position:absolute;
  z-index:0;

  background-image: url("${props => props.imageurl}");
  background-repeat:no-repeat;
  background-size: cover;
  background-position: center; 

  filter:blur(16px) opacity(40%) saturate(150%);
  transform:scale(1.20);
`;

/**
 * Style of text elements.
 */
const HeroTag = styled(animated.div)`
  position: absolute;
  font-weight: 600;
  color: var(--primary-colour);
`;

const Title = styled.div`
  font-size: 2.4em;
`;

const Subtitle = styled.div`
  font-family: var(--font-main);
  color: var(--accent-colour);
  font-size: 1.9em;
`;
