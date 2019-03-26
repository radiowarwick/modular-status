import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Card.js: A component which returns an 'information' card, with either an image or a text `tag` (limited to three characters) or both.
 *
 * @param {object} data - An object which defines the data to display in the card.
 */
const Card = ({ data }) => {
  return (
    <Container
      style={{
        margin: "0rem 1rem 1rem 1rem"
      }}
    >
      <Hero>
        {data.imageURL ? <HeroImage src={data.imageURL} /> : null}
        {data.tag ? <HeroTag>{data.tag.substring(0, 3)}</HeroTag> : null}
      </Hero>
      <Text>
        <Title>{data.title}</Title>
        <Subtitle>{data.subtitle}</Subtitle>
      </Text>
    </Container>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    tag: PropTypes.string,
    imageURL: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string
  })
};

export default Card;

/**
 * Container to hold hero and text elements.
 * Uses CSS flexbox to position children as a dynamic row.
 * A min-width ensures readability by enforcing a minimum text size.
 */
const Container = styled.div`
  height: 8rem;
  min-width: 8rem;

  background-color: rgb(61, 61, 61);
  border-radius: 0.6rem;
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);

  line-height: 1.2;
  font-family: "Lato", sans-serif;
  color: white;

  display: flex;
  align-items: center;

  user-select: none;
`;

/**
 * Element which holds either an image or a 'tag' text with yellow background.
 * Uses CSS Flexbox to position the tag text perfectly central to the parent.
 */
const Hero = styled.div`
  width: 8em;
  height: 100%;

  background-color: #d8b222;
  border-radius: 0.6em 0em 0em 0.6em;

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
  border-radius: 0.6em 0em 0em 0.6em;
`;

/**
 * Contains the text of the card, pushed over to the right.
 * Uses CSS text-overflow anf CSS Flexbox to allow text truncation.
 */
const Text = styled.div`
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  min-width: 0;

  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
  }
`;

/**
 * Style of text elements.
 */
const HeroTag = styled.div`
  font-size: 4em;
  position: absolute;
`;

const Title = styled.div`
  font-size: 2.5em;
`;

const Subtitle = styled.div`
  font-family: "Raleway", sans-serif;
  color: #d8b222;
  font-size: 2em;
`;
