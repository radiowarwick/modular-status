import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import ErrorBox from "../ErrorBox";

/**
 * Default story with an error message.
 */
export const errorBoxDefault = {
  message: "There has been an error..."
};

storiesOf("Simple/ErrorBox", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <ErrorBox message={text("message", errorBoxDefault.message)} />
  ));
