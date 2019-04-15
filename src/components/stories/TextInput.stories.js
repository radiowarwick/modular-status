import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";

import TextInput from "../TextInput";

export const textInput = {
  value: "",
  placeHolder: "Type Here"
};

export const actions = {
  handleChange: action("handleChange")
};

storiesOf("Simple/TextInput", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <TextInput
      value={text("value", textInput.value)}
      placeHolder={text("placeHolder", textInput.placeHolder)}
      handleChange={actions.handleChange}
    />
  ));
