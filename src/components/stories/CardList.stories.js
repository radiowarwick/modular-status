import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, object } from "@storybook/addon-knobs";

import CardList from "../CardList";

/**
 * A default list of cards. Many different types of card appear here.
 */
export const cardListDefault = {
  highlighted: false,
  cards: [
    {
      id: "bs_0",
      slim: false,
      colourful: false,
      data: {
        tag: "12X",
        title: "20:12",
        subtitle: "Towards Leamington"
      }
    },
    {
      id: "oa_0",
      slim: false,
      colourful: false,
      data: {
        imageURL: "https://media2.radio.warwick.ac.uk/static/shows/5010",
        title: "Psychademics",
        subtitle: "20:00 - 21:00"
      }
    },
    {
      id: "lp_0",
      slim: false,
      colourful: false,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/lastfm/track/tame%20impala/Feels%20Like%20We%20Only%20Go%20Backwards",
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
      colourful: false,
      data: {
        tag: "U1",
        title: "19:25",
        subtitle: "Towards Coventry"
      }
    },
    {
      id: "oa_1",
      slim: true,
      colourful: false,
      data: {
        imageURL: "https://media2.radio.warwick.ac.uk/static/shows/5163",
        title: "ReggaetÓN",
        subtitle: "19:00 - 20:00"
      }
    },
    {
      id: "lp_1",
      slim: true,
      colourful: false,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/lastfm/track/tame%20impala/patience",
        title: "Patience",
        subtitle: "Tame Impala"
      }
    }
  ]
};

/**
 * A slim list of cards. Many different types of card appear here.
 */
export const cardListColourful = {
  highlighted: false,
  cards: [
    {
      id: "bs_1.5",
      slim: false,
      colourful: true,
      data: {
        tag: "U1",
        title: "19:25",
        subtitle: "Towards Coventry"
      }
    },
    {
      id: "oa_1.5",
      slim: false,
      colourful: true,
      data: {
        imageURL: "https://media2.radio.warwick.ac.uk/static/shows/5299",
        title: "Farrardise",
        subtitle: "15:00 - 17:00"
      }
    },
    {
      id: "lp_1.5",
      slim: false,
      colourful: true,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/lastfm/track/still%20woozy/habit",
        title: "Habit",
        subtitle: "Still Woozy"
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
      colourful: false,
      data: {
        tag: "12X",
        title: "17:02",
        subtitle: "Towards Leamington"
      }
    },
    {
      id: "oa_2",
      slim: true,
      colourful: false,
      data: {
        imageURL: "https://media2.radio.warwick.ac.uk/static/shows/5100",
        title: "The Italian Football Show",
        subtitle: "17:00 - 18:00"
      }
    },
    {
      id: "lp_2",
      slim: true,
      colourful: true,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/lastfm/track/tame%20impala/borderline",
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
      colourful: false,
      data: {
        tag: "12X",
        title: "11:31",
        subtitle: "Towards Coventry"
      }
    },
    {
      id: "oa_3",
      slim: false,
      colourful: false,
      data: {
        imageURL: "https://media2.radio.warwick.ac.uk/static/shows/5047",
        title: "The Acoustic Lounge",
        subtitle: "11:00 - 12:00"
      }
    },
    {
      id: "lp_3",
      slim: false,
      colourful: false,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/lastfm/track/tame%20impala/let%20it%20happen",
        title: "Let It Happen",
        subtitle: "Tame Impala"
      }
    }
  ]
};

/**
 * An empty card list.
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
  .add("Colourful", () => (
    <CardList
      cards={cardListColourful.cards}
      highlighted={cardListColourful.highlighted}
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
