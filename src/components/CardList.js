import React from "react";
import { useSpring, useTransition, animated } from "react-spring";
import PropTypes from "prop-types";
import styled from "styled-components";

import Card from "./Card";

/**
 * CardList.js - Displays a list of cards that automagically animate their mount / unmount.
 *
 * @param {array} cards - An array of cards to print.
 * @param {boolean} highlight - Defines if the top card in the list should be highlighted.
 */
const CardList = ({ cards, highlighted }) => {
  /**
   * Enforce a maximum card length of 6, for performance reasons.
   *
   * Long lists tend to cause epic jank.
   */
  cards = cards.length > 6 ? cards.slice(0, 6) : cards;
  /**
   * Define the transitional animations which will play of mount / unmount.
   *
   * Define the height of the animatable element based on 'slimness'.
   */
  const transitions = useTransition(cards, cards.map(({ id }) => id), {
    from: { opacity: 0, transform: "translateX(8rem)", height: "0rem" },
    enter: item => [
      {
        height: item.slim ? "7rem" : "9rem",
        opacity: 1,
        transform: "translateX(0rem)"
      }
    ],
    update: item => [
      {
        height: item.slim ? "7rem" : "9rem",
        opacity: 1,
        transform: "translateX(0rem)"
      }
    ],
    leave: { opacity: 0, transform: "translateX(-8rem)", height: "0rem" },
    immediate: true
  });

  /**
   * If loading, print the loader.
   * If empty and not loading, print the 'empty' text.
   *
   * Map the transitions to animated `div`s that contain a card.
   */
  return (
    <div>
      <Frame>{cards.length < 1 ? <Empty>Nothing To Show</Empty> : null}</Frame>

      <div>
        {transitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props}>
            <Card
              key={item.id}
              data={item.data}
              slim={item.slim}
              colourful={item.colourful}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      slim: PropTypes.bool.isRequired,
      colourful: PropTypes.bool.isRequired,
      data: PropTypes.shape({
        tag: PropTypes.string,
        imageURL: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string
      }).isRequired
    }).isRequired
  )
};

export default CardList;

/**
 * Styled of the CardList info components (loading / empty).
 * Center-justified flexbox basis.
 */

const Empty = styled.div`
  font-family: var(--font-main);
  color: rgba(125, 125, 125, 0.75);
  font-size: 2em;
  font-style: italic;
`;

const Frame = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
