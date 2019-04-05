import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import Headline from "../components/Headline";

export const headline = {
  value: "Big Important Text",
  fontSize: 1.8
};

storiesOf("Simple/Headline", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Headline
      value={text("value", headline.value)}
      fontSize={number("fontSize", headline.fontSize)}
    />
  ));
