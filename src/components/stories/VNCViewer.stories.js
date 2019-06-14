import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import VNCViewer from "../VNCViewer";

/**
 * Default story with an default url.
 */
export const vncViewerDefault = {
  wsURL: "ws://status:3000?token=playout1"
};

storiesOf("Composite/VNCViewer", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ height: "100vh" }}>{story()}</div>)
  .add("Default", () => (
    <VNCViewer wsURL={text("url", vncViewerDefault.wsURL)} />
  ));
