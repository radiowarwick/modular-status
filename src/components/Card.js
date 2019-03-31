import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Card.js: A component which returns an 'information' card, with either an image or a text `tag` (limited to three characters) or both.
 *
 * @param {object} data - An object which defines the data to display in the card.
 */
const Card = ({ data, slim, active }) => {
  return (
    <Container slim={slim} active={active}>
      {!data.imageURL && !data.tag ? null : (
        <Hero slim={slim}>
          {data.imageURL ? <HeroImage src={data.imageURL} /> : null}
          {data.tag ? (
            <HeroTag slim={slim}>{data.tag.substring(0, 3)}</HeroTag>
          ) : null}
        </Hero>
      )}
      <Text slim={slim}>
        <Title>{data.title}</Title>
        <Subtitle>{data.subtitle}</Subtitle>
      </Text>
    </Container>
  );
};

Card.propTypes = {
  slim: PropTypes.bool,
  active: PropTypes.bool,
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
 */
const Container = styled.div`
  height: ${props => (props.slim ? "6rem" : "8rem")};
  min-width: ${props => (props.slim ? "6rem" : "8rem")};
  margin: 0 1rem 1rem 1rem;

  box-sizing: border-box;
  background-color: var(--primary-colour);
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);

  border-radius: 0.6rem;
  border: ${props =>
    props.active ? "0.2rem solid var(--accent-colour);" : "none;"}
  
  font-family: var(--font-heading);
  color: var(--secondary-colour);

  display: flex;
  align-items: center;

  user-select: none;
  overflow: hidden;
`;

const InfoLabel = styled.div`
  width: 3rem;
  height: 8rem;
  font-size: 1.25rem;
  box-shadow: inset 0px 0px 5px 1px rgba(0, 0, 0, 0.75);
`;

/**
 * Element which holds either an image or a 'tag' text with yellow background.
 * Uses CSS Flexbox to position the tag text perfectly central to the parent.
 */
const Hero = styled.div`
  width: ${props => (props.slim ? "6rem" : "8rem")};
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
const Text = styled.div`
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: ${props => (props.slim ? "1" : "1.25")};

  div {
    white-space: nowrap;
    text-overflow: clip;
  }
`;

/**
 * Style of text elements.
 */
const HeroTag = styled.div`
  font-size: ${props => (props.slim ? "3rem" : "4rem")};
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
