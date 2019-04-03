import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, object } from "@storybook/addon-knobs";

import CardList from "../components/CardList";

/**
 * A default list of cards. Many different types of card appear here.
 */
export const cardListDefault = {
  highlighted: false,
  cards: [
    {
      id: "bs_0",
      slim: false,
      data: {
        tag: "12X",
        title: "20:12",
        subtitle: "Towards Leamington"
      }
    },
    {
      id: "oa_0",
      slim: false,
      data: {
        imageURL: "https://media.radio.warwick.ac.uk/shows/5010.large.jpg",
        title: "Psychademics",
        subtitle: "20:00 - 21:00"
      }
    },
    {
      id: "lp_0",
      slim: false,
      data: {
        imageURL:
          "https://images-na.ssl-images-amazon.com/images/I/A1gZc70vUIL._SL1500_.jpg",
        title: "Feels Like We Only Go Backwards (Special Edition)",
        subtitle: "Tame Impala"
      }
    }
  ]
};

/**
 * A slim list of cards. Many different types of card appear here.
 */
export const cardListSlim = {
  highlighted: false,
  cards: [
    {
      id: "bs_1",
      slim: true,
      data: {
        tag: "U1",
        title: "19:25",
        subtitle: "Towards Coventry"
      }
    },
    {
      id: "oa_1",
      slim: true,
      data: {
        imageURL: "https://media.radio.warwick.ac.uk/shows/5163.large.jpg",
        title: "ReggaetÓN",
        subtitle: "19:00 - 20:00"
      }
    },
    {
      id: "lp_1",
      slim: true,
      data: {
        imageURL:
          "http://www.brooklynvegan.com/files/2019/03/tame-impala-patience.jpg",
        title: "Patience",
        subtitle: "Tame Impala"
      }
    }
  ]
};

/**
 * A mixed list of cards. Many different types of card appear here.
 */
export const cardListMixed = {
  highlighted: false,
  cards: [
    {
      id: "bs_2",
      slim: false,
      data: {
        tag: "12X",
        title: "17:02",
        subtitle: "Towards Leamington"
      }
    },
    {
      id: "oa_2",
      slim: true,
      data: {
        imageURL: "https://media.radio.warwick.ac.uk/shows/5100.large.jpg",
        title: "The Italian Football Show",
        subtitle: "17:00 - 18:00"
      }
    },
    {
      id: "lp_2",
      slim: true,
      data: {
        imageURL: "https://i.ytimg.com/vi/hNJOI2dtDZ4/maxresdefault.jpg",
        title: "Borderline",
        subtitle: "Tame Impala"
      }
    }
  ]
};

/**
 * A list of cards with a highlighted head. Many different types of card appear here.
 */
export const cardListHighlight = {
  highlighted: true,
  cards: [
    {
      id: "bs_3",
      slim: false,
      data: {
        tag: "12X",
        title: "11:31",
        subtitle: "Towards Coventry"
      }
    },
    {
      id: "oa_3",
      slim: false,
      data: {
        imageURL: "https://media.radio.warwick.ac.uk/shows/5047.large.jpg",
        title: "The Acoustic Lounge",
        subtitle: "11:00 - 12:00"
      }
    },
    {
      id: "lp_3",
      slim: false,
      data: {
        imageURL:
          "https://images-na.ssl-images-amazon.com/images/I/A1LVEJikmZL._SL1500_.jpg",
        title: "New Person (Same Old Mistakes)",
        subtitle: "Tame Impala"
      }
    }
  ]
};

/**
 * An empty card list that is not loading.
 */
export const cardListEmpty = {
  title: "Empty",
  highlighted: false,
  cards: []
};

storiesOf("Composite/CardList", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ marginTop: "1rem" }}>{story()}</div>)
  .add("Default", () => (
    <CardList
      cards={object("cards", cardListDefault.cards)}
      highlighted={boolean("highlighted", cardListDefault.highlighted)}
    />
  ))
  .add("Slim", () => (
    <CardList
      cards={cardListSlim.cards}
      highlighted={cardListSlim.highlighted}
    />
  ))
  .add("Mixed", () => (
    <CardList
      cards={cardListMixed.cards}
      highlighted={cardListMixed.highlighted}
    />
  ))
  .add("Highlighted", () => (
    <CardList
      cards={cardListHighlight.cards}
      highlighted={cardListHighlight.highlighted}
    />
  ))
  .add("Empty", () => (
    <CardList
      cards={cardListEmpty.cards}
      highlighted={cardListEmpty.highlighted}
    />
  ));
