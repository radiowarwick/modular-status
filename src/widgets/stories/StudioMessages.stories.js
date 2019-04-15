import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

import StuidoMessages from "../BusTimes";

/**
 * A default bus with 5 departures.
 */
export const studioMessagesDefault = {
  err: false,
  data: {}
};

storiesOf("Widgets/StudioMessages", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <StuidoMessages
      err={boolean("err", studioMessagesDefault.err)}
      data={object("data", studioMessagesDefault.data)}
    />
  ));
