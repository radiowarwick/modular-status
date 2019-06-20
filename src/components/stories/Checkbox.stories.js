import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import Checkbox from "../Checkbox";
import checkboxNotes from "../notes/Checkbox.md";

/**
 * Defines a default loader of a reasonable size.
 */
export const defaultCheckbox = {
  isChecked: true,
  value: "Checkbox Here!",
  handleChange: e => {
    console.log("clicked");
  }
};

storiesOf("Simple/Checkbox", module)
  .addDecorator(withKnobs)
  .add(
    "Default",
    () => (
      <Checkbox
        isChecked={boolean("isChecked", defaultCheckbox.isChecked)}
        value={text("value", defaultCheckbox.value)}
        handleChange={defaultCheckbox.handleChange}
      />
    ),
    { notes: { markdown: checkboxNotes } }
  );
