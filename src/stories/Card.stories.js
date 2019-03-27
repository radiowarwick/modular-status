import React from "react";
import { storiesOf } from "@storybook/react";

import Card from "../components/Card";

/**
 * A card with a tag only.
 */
const cardDefault = {
  key: "bus_1",
  data: {
    tag: "12X",
    title: "20:12",
    subtitle: "Towards leamington"
  }
};

/**
 * A card with an image only.
 */
const cardImage = {
  key: "oa_1",
  data: {
    imageURL: "https://media.radio.warwick.ac.uk/shows/5010.large.jpg",
    title: "Psychademics",
    subtitle: "20:00 - 21:00"
  }
};

/**
 * A card with a lot of text.
 */
const cardLong = {
  key: "lp_1",
  data: {
    imageURL:
      "https://images-na.ssl-images-amazon.com/images/I/A1gZc70vUIL._SL1500_.jpg",
    title: "Feels Like We Only Go Backwards (Special Edition)",
    subtitle: "Tame Impala"
  }
};

storiesOf("Card", module)
  .addDecorator(story => <div style={{ marginTop: "1rem" }}>{story()}</div>)
  .add("Default", () => <Card key={cardDefault.key} data={cardDefault.data} />)
  .add("With Image", () => <Card key={cardImage.key} data={cardImage.data} />)
  .add("With Long Text", () => (
    <Card key={cardLong.key} data={cardLong.data} />
  ));
