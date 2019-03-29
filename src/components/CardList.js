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
 * @param {bool} isSlim - Defines if the cards should be slim.
 * @param {bool} isWrapped - Defines is the cards should wrap.
 */
const CardList = ({ title, cards, loading, isSlim, isWrapped }) => {
  /**
   * Define the transitional animations which will play of mount / unmount.
   */
  const transitions = useTransition(cards, cards.map(({ id }) => id), {
    from: { opacity: 0, transform: "translateX(8rem)", height: "0rem" },
    enter: {
      opacity: 1,
      transform: "translateX(0rem)",
      height: isSlim ? "7rem" : "9rem"
    },
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
      ) : (
        <CardContainer wrap={isWrapped}>
          {transitions.map(({ item, key, props }) => (
            <animated.div key={key} style={props}>
              <Card key={item.id} data={item.data} slim={isSlim} />
            </animated.div>
          ))}
        </CardContainer>
      )}
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  isSlim: PropTypes.bool,
  isWrapped: PropTypes.bool
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

/**
 * If wrapping is true, then apply wrapping styles.
 */
const CardContainer = styled.div`
  display: ${props => (props.wrap ? "flex" : "block")}
  flex-wrap: ${props => (props.wrap ? "wrap" : "nowrap")}
`;
