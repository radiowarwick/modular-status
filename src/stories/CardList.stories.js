import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import CardList from "../components/CardList";

/**
 * A default list of cards. Many different types of card appear here.
 */
export const cardListDefault = {
  title: "Default",
  cards: [
    {
      key: "bs_0",
      data: {
        tag: "12X",
        title: "20:12",
        subtitle: "Towards leamington"
      }
    },
    {
      key: "oa_0",
      data: {
        imageURL: "https://media.radio.warwick.ac.uk/shows/5010.large.jpg",
        title: "Psychademics",
        subtitle: "20:00 - 21:00"
      }
    },
    {
      key: "lp_0",
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
      cards={cardListDefault.cards}
      loading={boolean("loading", cardListDefault.loading)}
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
