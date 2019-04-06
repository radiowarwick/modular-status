import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

import WidgetOverlay from "../components/WidgetOverlay";

/**
 * Default story with an error message.
 */
export const widgetOverlayDefault = {
  error: { message: "Offline" },
  loading: false
};

export const widgetOverlayLoading = {
  loading: true
};

storiesOf("Simple/WidgetOverlay", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ height: "100vh" }}>{story()}</div>)
  .add("Default", () => (
    <WidgetOverlay
      error={object("error", widgetOverlayDefault.error)}
      loading={boolean("loading", widgetOverlayDefault.loading)}
    />
  ))
  .add("Loading", () => (
    <WidgetOverlay loading={widgetOverlayLoading.loading} />
  ));
