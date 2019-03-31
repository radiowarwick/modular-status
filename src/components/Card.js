import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

/**
 * Card.js: A component which returns an 'information' card, with either an image or a text `tag` (limited to three characters) or both.
 *
 * @param {object} data - An object which defines the data to display in the card.
 */
const Card = ({ data, slim }) => {
  const props = {
    container: useSpring({
      height: slim ? "6rem" : "8rem"
    }),
    hero: useSpring({
      width: slim ? "6rem" : "8rem"
    }),
    tag: useSpring({
      fontSize: slim ? "3rem" : "4rem"
    }),
    text: useSpring({
      lineHeight: slim ? "1" : "1.25"
    })
  };

  return (
    <Container style={props.container}>
      {!data.imageURL && !data.tag ? null : (
        <Hero style={props.hero}>
          {data.imageURL ? <HeroImage src={data.imageURL} /> : null}
          {data.tag ? (
            <HeroTag style={props.tag}>{data.tag.substring(0, 3)}</HeroTag>
          ) : null}
        </Hero>
      )}
      <Text style={props.text}>
        <Title>{data.title}</Title>
        <Subtitle>{data.subtitle}</Subtitle>
      </Text>
    </Container>
  );
};

Card.propTypes = {
  slim: PropTypes.bool.isRequired,
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
  margin: 0 1rem 1rem 1rem;

  background-color: var(--primary-colour);
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
  border-radius: 0.6rem;

  font-family: var(--font-heading);
  color: var(--secondary-colour);

  display: flex;
  align-items: center;

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
 * Contains the text of the card, pushed over to the right.
 * Uses CSS text-overflow anf CSS Flexbox to allow text truncation.
 */
const Text = styled(animated.div)`
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  min-width: 0;

  div {
    white-space: nowrap;
    text-overflow: clip;
  }
`;

/**
 * Style of text elements.
 */
const HeroTag = styled(animated.div)`
  position: absolute;
`;

const Title = styled.div`
  font-size: 2.5em;
`;

const Subtitle = styled.div`
  font-family: var(--font-main);
  color: var(--accent-colour);
  font-size: 2em;
`;
