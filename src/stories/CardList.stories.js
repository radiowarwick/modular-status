import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";

import CardList from "../components/CardList";

/**
 * A default list of cards. Many different types of card appear here.
 */
export const cardListDefault = {
  title: "Default",
  isSlim: false,
  isWrapped: false,
  cards: [
    {
      id: "bs_0",
      data: {
        tag: "12X",
        title: "20:12",
        subtitle: "Towards leamington"
      }
    },
    {
      id: "oa_0",
      data: {
        imageURL: "https://media.radio.warwick.ac.uk/shows/5010.large.jpg",
        title: "Psychademics",
        subtitle: "20:00 - 21:00"
      }
    },
    {
      id: "lp_0",
      data: {
        imageURL:
          "https://images-na.ssl-images-amazon.com/images/I/A1gZc70vUIL._SL1500_.jpg",
        title: "Feels Like We Only Go Backwards (Special Edition)",
        subtitle: "Tame Impala"
      }
    }
  ],
  loading: false
};

/**
 * A slim list of cards. Many different types of card appear here.
 */
export const cardListSlim = {
  title: "Slim",
  isSlim: true,
  cards: [
    {
      id: "bs_1",
      data: {
        tag: "U1",
        title: "20:25",
        subtitle: "Towards Coventry"
      }
    },
    {
      id: "oa_1",
      data: {
        imageURL: "https://media.radio.warwick.ac.uk/shows/5163.large.jpg",
        title: "ReggaetÓN",
        subtitle: "19:00 - 20:00"
      }
    },
    {
      id: "lp_1",
      data: {
        imageURL:
          "http://www.brooklynvegan.com/files/2019/03/tame-impala-patience.jpg",
        title: "Patience",
        subtitle: "Tame Impala"
      }
    }
  ],
  loading: false
};

/**
 * A card list which is loading.
 */
export const cardListLoading = {
  title: "Loading",
  cards: [],
  loading: true
};

/**
 * An empty card list that is not loading.
 */
export const cardListEmpty = {
  title: "Empty",
  cards: [],
  loading: false
};

storiesOf("Composite/CardList", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <CardList
      title={text("title", cardListDefault.title)}
      cards={object("cards", cardListDefault.cards)}
      isSlim={cardListDefault.isSlim}
      loading={boolean("loading", cardListDefault.loading)}
    />
  ))
  .add("Slim", () => (
    <CardList
      title={cardListSlim.title}
      cards={cardListSlim.cards}
      isSlim={cardListSlim.isSlim}
      loading={cardListSlim.loading}
    />
  ))
  .add("Loading", () => (
    <CardList
      title={cardListLoading.title}
      cards={cardListLoading.cards}
      loading={cardListLoading.loading}
    />
  ))
  .add("Empty", () => (
    <CardList
      title={cardListEmpty.title}
      cards={cardListEmpty.cards}
      loading={cardListEmpty.loading}
    />
  ));
