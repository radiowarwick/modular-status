import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

import Card from "../components/Card";

/**
 * A card with a tag only.
 */
const cardDefault = {
  key: "bs_0",
  slim: false,
  data: {
    tag: "12X",
    imageURL: "",
    title: "20:12",
    subtitle: "Towards leamington"
  }
};

/**
 * A card with an image only.
 */
const cardSlim = {
  key: "sl_0",
  slim: true,
  data: {
    imageURL: "https://media.radio.warwick.ac.uk/shows/5010.large.jpg",
    title: "Psychademics",
    subtitle: "20:00 - 21:00"
  }
};

/**
 * A card with an image only.
 */
const cardImage = {
  key: "oa_0",
  data: {
    imageURL: "https://media.radio.warwick.ac.uk/shows/5010.large.jpg",
    title: "Psychademics",
    subtitle: "20:00 - 21:00"
  }
};

/**
 * A card with no Hero
 */
const cardNoHero = {
  key: "bk_0",
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
  data: {
    imageURL:
      "https://images-na.ssl-images-amazon.com/images/I/A1gZc70vUIL._SL1500_.jpg",
    title: "Feels Like We Only Go Backwards (Special Edition)",
    subtitle: "Tame Impala"
  }
};

storiesOf("Simple/Card", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ marginTop: "1rem" }}>{story()}</div>)
  .add("Default", () => (
    <Card
      key={cardDefault.key}
      data={object("data", cardDefault.data)}
      slim={boolean("slim", cardDefault.slim)}
    />
  ))
  .add("Slim", () => (
    <Card key={cardSlim.key} data={cardSlim.data} slim={cardSlim.slim} />
  ))
  .add("With Image", () => <Card key={cardImage.key} data={cardImage.data} />)
  .add("No Hero", () => <Card key={cardNoHero.key} data={cardNoHero.data} />)
  .add("With Long Text", () => (
    <Card key={cardLong.key} data={cardLong.data} />
  ));
