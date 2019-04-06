import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

import CurrentDateTime from "../CurrentDateTime";

/**
 * Default current date and time component, with no error and an empty (not null) data object.
 */
export const currentDateTimeDefault = {
  err: false,
  data: {}
};

storiesOf("Widgets/CurrentDateTime", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <CurrentDateTime
      err={boolean("err", currentDateTimeDefault.err)}
      data={object("data", currentDateTimeDefault.data)}
    />
  ));
