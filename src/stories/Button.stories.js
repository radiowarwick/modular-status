import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "../components/Button";

/**
 * An active button with some text.
 */
export const buttonDefault = {
  value: "Click Me!"
};

/**
 * An active button with an icon.
 */
export const buttonIcon = {
  icon: "fingerprint"
};

/**
 * An active button with an icon.
 */
export const buttonLoading = {
  loading: true
};

/**
 * A disabled button with some *sad* text.
 */
export const buttonDisabled = {
  value: "You Can't Click Me :(",
  disabled: true
};

/**
 * `handleClick` action is called when the button is clicked.
 */
export const actions = {
  handleClick: action("handleClick")
};

storiesOf("Button", module)
  .add("Default", () => (
    <Button value={buttonDefault.value} handleClick={actions.handleClick} />
  ))
  .add("Loading", () => (
    <Button loading={buttonLoading.loading} handleClick={actions.handleClick} />
  ))
  .add("Disabled", () => (
    <Button
      value={buttonDisabled.value}
      handleClick={actions.handleClick}
      disabled={buttonDisabled.disabled}
    />
  ))
  .add("With Icon", () => (
    <Button icon={buttonIcon.icon} handleClick={actions.handleClick} />
  ))
  .add("With Icon & Text", () => (
    <Button
      value={buttonDefault.value}
      icon={buttonIcon.icon}
      handleClick={actions.handleClick}
    />
  ));
