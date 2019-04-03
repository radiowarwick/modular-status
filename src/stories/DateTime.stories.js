import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";

import DateTime from "../components/DateTime";

/**
 * A default time, one second before the new year.
 */
export const dateTimeDefault = {
  unix: 1577836799
};

storiesOf("Simple/DateTime", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <DateTime unix={number("unix", dateTimeDefault.unix)} />
  ));
