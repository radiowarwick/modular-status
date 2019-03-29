import React from "react";
import { useTransition, animated } from "react-spring";
import PropTypes from "prop-types";
import styled from "styled-components";

import Card from "./Card";
import Headline from "./Headline";
import Loader from "./Loader";

/**
 * CardList.js - Displays a list of cards that automagically animate their mount / unmount.
 *
 * @param {string} title - The main title text of the list.
 * @param {array} cards - An array of cards to print.
 * @param {bool} loading - Defines if the card list is loading.
 */
const CardList = ({ title, cards, loading }) => {
  /**
   * Define the transitional animations which will play of mount / unmount.
   */
  const transitions = useTransition(cards, cards.map(({ key }) => key), {
    from: { opacity: 0, transform: "translateX(8rem)", height: "0rem" },
    enter: { opacity: 1, transform: "translateX(0rem)", height: "9rem" },
    leave: { opacity: 0, transform: "translateX(-8rem)", height: "0rem" }
  });

  /**
   * If loading, print the loader.
   * If empty and not loading, print the 'empty' text.
   *
   * Map the transitions to animated `div`s that contain a card.
   */
  return (
    <div>
      <Headline value={title} />

      {loading ? (
        <InfoContainer>
          <Loader size={1} />
        </InfoContainer>
      ) : null}

      {cards.length < 1 && !loading ? (
        <InfoContainer>
          <Empty>Nothing To Show</Empty>
        </InfoContainer>
      ) : null}

      {transitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          <Card key={item.key} data={item.data} />
        </animated.div>
      ))}
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default CardList;

/**
 * Styled of the CardList info components (loading / empty).
 * Center-justified flexbox basis.
 */
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Empty = styled.div`
  font-family: "Raleway", sans-serif;
  color: rgba(125, 125, 125, 0.75);
  font-size: 2em;
  font-style: italic;
`;
