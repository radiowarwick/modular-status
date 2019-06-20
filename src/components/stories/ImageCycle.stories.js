import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, object, boolean } from "@storybook/addon-knobs";

import ImageCycle from "../ImageCycle";
import imageCycleNotes from "../notes/ImageCycle.md";

/**
 * A Default image cycle with three images.
 */
const imageCycleDefault = {
  interval: 2500,
  animate: true,
  forceFetch: false,
  images: [
    {
      id: "img_0",
      url: "https://media2.radio.warwick.ac.uk/static/marketing/default"
    },
    {
      id: "img_1",
      url: "https://media2.radio.warwick.ac.uk/static/marketing/default"
    },
    {
      id: "img_2",
      url: "https://media2.radio.warwick.ac.uk/static/marketing/default"
    }
  ]
};

/**
 * A non-animated, force fetch cycle.
 */
const imageCycleNoAnim = {
  interval: 7500,
  animate: false,
  forceFetch: true,
  images: [
    {
      id: "st1_dj",
      url: "https://webcams.radio.warwick.ac.uk/st1-dj.jpg"
    },
    {
      id: "st1_guest",
      url: "https://webcams.radio.warwick.ac.uk/st1-guest.jpg"
    }
  ]
};

storiesOf("Composite/ImageCycle", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    () => (
      <ImageCycle
        interval={number("interval", imageCycleDefault.interval)}
        animate={boolean("animate", imageCycleDefault.animate)}
        forceFetch={boolean("forceFetch", imageCycleDefault.forceFetch)}
        images={object("images", imageCycleDefault.images)}
      />
    ),
    { notes: { markdown: imageCycleNotes } }
  )
  .add(
    "No Animation",
    () => (
      <ImageCycle
        interval={imageCycleNoAnim.interval}
        animate={imageCycleNoAnim.animate}
        forceFetch={imageCycleNoAnim.forceFetch}
        images={imageCycleNoAnim.images}
      />
    ),
    { notes: { markdown: imageCycleNotes } }
  );
