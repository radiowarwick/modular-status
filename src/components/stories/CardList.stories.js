import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import CardList from "../CardList";
import cardListNotes from "../notes/CardList.md";

/**
 * A default list of cards. Many different types of card appear here.
 */
export const cardListDefault = {
  cards: [
    {
      id: "bs_0",
      slim: false,
      colourful: false,
      dark: false,
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
      dark: false,
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
      dark: false,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/music/track/tame%20impala/Feels%20Like%20We%20Only%20Go%20Backwards",
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
  cards: [
    {
      id: "bs_1",
      slim: true,
      colourful: false,
      dark: false,
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
      dark: false,
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
      dark: false,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/music/track/tame%20impala/patience",
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
  cards: [
    {
      id: "bs_1.5",
      slim: false,
      colourful: true,
      dark: false,
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
      dark: false,
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
      dark: false,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/music/track/still%20woozy/habit",
        title: "Habit",
        subtitle: "Still Woozy"
      }
    }
  ]
};

/**
 * A slim list of cards. Many different types of card appear here.
 */
export const cardListDark = {
  cards: [
    {
      id: "bs_1.55",
      slim: false,
      colourful: false,
      dark: true,
      data: {
        tag: "U1",
        title: "19:25",
        subtitle: "Towards Coventry"
      }
    },
    {
      id: "oa_1.55",
      slim: false,
      colourful: false,
      dark: true,
      data: {
        imageURL: "https://media2.radio.warwick.ac.uk/static/shows/5299",
        title: "Farrardise",
        subtitle: "15:00 - 17:00"
      }
    },
    {
      id: "lp_1.55",
      slim: false,
      colourful: false,
      dark: true,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/music/track/still%20woozy/habit",
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
  cards: [
    {
      id: "bs_2",
      slim: false,
      colourful: false,
      dark: false,
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
      dark: false,
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
      dark: false,
      data: {
        imageURL:
          "https://media2.radio.warwick.ac.uk/music/track/tame%20impala/borderline",
        title: "Borderline",
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
  cards: []
};

storiesOf("Composite/CardList", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ marginTop: "1rem" }}>{story()}</div>)
  .add(
    "Default",
    () => <CardList cards={object("cards", cardListDefault.cards)} />,
    { notes: { markdown: cardListNotes } }
  )
  .add("Slim", () => <CardList cards={cardListSlim.cards} />, {
    notes: { markdown: cardListNotes }
  })
  .add("Colourful", () => <CardList cards={cardListColourful.cards} />, {
    notes: { markdown: cardListNotes }
  })
  .add("Dark", () => <CardList cards={cardListDark.cards} />, {
    notes: { markdown: cardListNotes }
  })
  .add("Mixed", () => <CardList cards={cardListMixed.cards} />, {
    notes: { markdown: cardListNotes }
  })
  .add("Empty", () => <CardList cards={cardListEmpty.cards} />, {
    notes: { markdown: cardListNotes }
  });
