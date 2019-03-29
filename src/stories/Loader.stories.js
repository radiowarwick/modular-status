import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";

import Loader from "../components/Loader";

/**
 * Defines a default loader of a reasonable size.
 */
export const loader = {
  size: 1
};

storiesOf("Simple/Loader", module)
  .addDecorator(withKnobs)
  .add("Default", () => <Loader size={number("size", loader.size)} />);
