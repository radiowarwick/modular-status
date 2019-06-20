import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";

import WidgetOverlay from "../WidgetOverlay";
import widgetOverlayNotes from "../notes/WidgetOverlay.md";

/**
 * Default story with an error message.
 */
export const widgetOverlayDefault = {
  error: { message: "There has been an error..." },
  loading: false
};

/**
 * A story where the widget is loading.
 */
export const widgetOverlayLoading = {
  error: null,
  loading: true
};

storiesOf("Composite/WidgetOverlay", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ height: "100vh" }}>{story()}</div>)
  .add(
    "Default",
    () => (
      <WidgetOverlay
        error={object("error", widgetOverlayDefault.error)}
        loading={boolean("loading", widgetOverlayDefault.loading)}
      />
    ),
    { notes: { markdown: widgetOverlayNotes } }
  )
  .add(
    "Loading",
    () => <WidgetOverlay loading={widgetOverlayLoading.loading} />,
    { notes: { markdown: widgetOverlayNotes } }
  );
