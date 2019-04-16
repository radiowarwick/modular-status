import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import Marketing from "../Marketing";

/**
 * Default array of marketing images.
 */
export const marketingDefault = {
  err: null,
  data: {
    success: true,
    images: [
      {
        id: "img_0",
        url: "https://media2.radio.warwick.ac.uk/static/marketing/bigd"
      },
      {
        id: "img_1",
        url: "https://media2.radio.warwick.ac.uk/static/marketing/default"
      },
      {
        id: "img_2",
        url: "https://media2.radio.warwick.ac.uk/static/marketing/varsity"
      }
    ]
  }
};

storiesOf("Widgets/Marketing", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Marketing
      err={object("err", marketingDefault.err)}
      data={object("data", marketingDefault.data)}
    />
  ));
