import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import Headline from "../Headline";
import headlineNotes from "../notes/Headline.md";

export const headlineDefault = {
  value: "Big Important Text",
  fontSize: 1.8
};

storiesOf("Simple/Headline", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    () => (
      <Headline
        value={text("value", headlineDefault.value)}
        fontSize={number("fontSize", headlineDefault.fontSize)}
      />
    ),
    { notes: { markdown: headlineNotes } }
  );
