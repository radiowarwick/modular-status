import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import VNCViewer from "../VNCViewer";

/**
 * Default story with an default url.
 */
export const vncViewerDefault = {
  url: "ws://status:3000?token=playout1"
};

storiesOf("Composite/VNCViewer", module)
  .addDecorator(withKnobs)
  .add("Default", () => <VNCViewer url={text("url", vncViewerDefault.url)} />);
