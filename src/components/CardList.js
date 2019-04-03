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
   * Define the transitional animations which will play of mount / unmount.
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
    leave: { opacity: 0, transform: "translateX(-8rem)", height: "0rem" }
  });

  const frameProps = useSpring({
    height: cards.length > 0 && cards[0].slim ? "6.3rem" : "8.3rem",
    borderWidth: highlighted ? "0.2rem" : "0rem"
  });

  /**
   * If loading, print the loader.
   * If empty and not loading, print the 'empty' text.
   *
   * Map the transitions to animated `div`s that contain a card.
   */
  return (
    <div>
      <Frame style={frameProps}>
        {cards.length < 1 ? <Empty>Nothing To Show</Empty> : null}
      </Frame>

      <div>
        {transitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props}>
            <Card key={item.id} data={item.data} slim={item.slim} />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  highlighted: PropTypes.bool.isRequired
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
  width: calc(100% - 1.6rem);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  border-color: var(--accent-colour);
  border-style: solid;
  margin: 0 0.8rem;
  border-radius: 0.9rem;
  z-index: 99;
  transform: translateY(-0.2rem);
`;
