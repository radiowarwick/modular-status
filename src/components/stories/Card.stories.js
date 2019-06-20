import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

import Card from "../Card";
import cardNotes from "../notes/Card.md";

/**
 * A card with a tag only.
 */
const cardDefault = {
  key: "bs_0",
  slim: false,
  colourful: false,
  dark: false,
  data: {
    tag: "12X",
    imageURL: "",
    title: "20:12",
    subtitle: "Towards leamington"
  }
};

/**
 * A slim card with an image only.
 */
const cardSlim = {
  key: "sl_0",
  slim: true,
  colourful: false,
  data: {
    imageURL: "https://media2.radio.warwick.ac.uk/static/shows/5010",
    title: "Psychademics",
    subtitle: "20:00 - 21:00"
  }
};

/**
 * A card with an image only.
 */
const cardImage = {
  key: "oa_0",
  slim: false,
  colourful: false,
  data: {
    imageURL: "https://media2.radio.warwick.ac.uk/static/shows/5010",
    title: "Psychademics",
    subtitle: "20:00 - 21:00"
  }
};

/**
 * A card with no Hero
 */
const cardNoHero = {
  key: "bk_0",
  slim: false,
  colourful: false,
  data: {
    title: "Title",
    subtitle: "Subtitle"
  }
};

/**
 * A card with a lot of text.
 */
const cardLong = {
  key: "lp_0",
  slim: false,
  colourful: false,
  data: {
    imageURL:
      "https://media2.radio.warwick.ac.uk/music/track/tame%20impala/Feels%20Like%20We%20Only%20Go%20Backwards",
    title: "Feels Like We Only Go Backwards (Special Edition)",
    subtitle: "Tame Impala"
  }
};

/**
 * A colourful card
 */
const cardColourful = {
  key: "cf_0",
  slim: false,
  colourful: true,
  data: {
    imageURL:
      "https://media2.radio.warwick.ac.uk/music/track/tops/superstition%20future",
    title: "Superstition Future",
    subtitle: "TOPS"
  }
};

/**
 * A dark card
 */
const cardDark = {
  key: "lk_0",
  slim: true,
  colourful: false,
  dark: true,
  data: {
    tag: "19",
    title: "Joe Bloggs"
  }
};

storiesOf("Simple/Card", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ marginTop: "1rem" }}>{story()}</div>)
  .add(
    "Default",
    () => (
      <Card
        key={cardDefault.key}
        data={object("data", cardDefault.data)}
        slim={boolean("slim", cardDefault.slim)}
        colourful={boolean("colourful", cardDefault.colourful)}
        dark={boolean("dark", cardDefault.dark)}
      />
    ),
    { notes: { markdown: cardNotes } }
  )
  .add(
    "Slim",
    () => (
      <Card
        key={cardSlim.key}
        data={cardSlim.data}
        slim={cardSlim.slim}
        colourful={cardSlim.colourful}
      />
    ),
    { notes: { markdown: cardNotes } }
  )
  .add(
    "With Image",
    () => (
      <Card
        key={cardImage.key}
        data={cardImage.data}
        slim={cardImage.slim}
        colourful={cardImage.colourful}
      />
    ),
    { notes: { markdown: cardNotes } }
  )
  .add(
    "No Hero",
    () => (
      <Card
        key={cardNoHero.key}
        data={cardNoHero.data}
        slim={cardNoHero.slim}
        colourful={cardNoHero.colourful}
      />
    ),
    { notes: { markdown: cardNotes } }
  )
  .add(
    "With Long Text",
    () => (
      <Card
        key={cardLong.key}
        data={cardLong.data}
        slim={cardLong.slim}
        colourful={cardLong.colourful}
      />
    ),
    { notes: { markdown: cardNotes } }
  )
  .add(
    "Colourful",
    () => (
      <Card
        key={cardColourful.key}
        data={cardColourful.data}
        slim={cardColourful.slim}
        colourful={cardColourful.colourful}
      />
    ),
    { notes: { markdown: cardNotes } }
  )
  .add(
    "Dark",
    () => (
      <Card
        key={cardDark.key}
        data={cardDark.data}
        slim={cardDark.slim}
        colourful={cardDark.colourful}
        dark={cardDark.dark}
      />
    ),
    { notes: { markdown: cardNotes } }
  );
