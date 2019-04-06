import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";

import DateTime from "../components/DateTime";

export const dateTimeDefault = {
  unixStart: 0
};

storiesOf("Simple/DateTime", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <DateTime unixStart={number("unixStart", dateTimeDefault.unixStart)} />
  ));
