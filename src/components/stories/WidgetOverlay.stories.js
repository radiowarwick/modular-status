import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

import WidgetOverlay from "../WidgetOverlay";

/**
 * Default story with an error message.
 */
export const widgetOverlayDefault = {
  error: true,
  loading: false
};

/**
 * A story where the widget is loading.
 */
export const widgetOverlayLoading = {
  loading: true
};

storiesOf("Composite/WidgetOverlay", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ height: "100vh" }}>{story()}</div>)
  .add("Default", () => (
    <WidgetOverlay
      error={boolean("error", widgetOverlayDefault.error)}
      loading={boolean("loading", widgetOverlayDefault.loading)}
    />
  ))
  .add("Loading", () => (
    <WidgetOverlay loading={widgetOverlayLoading.loading} />
  ));
