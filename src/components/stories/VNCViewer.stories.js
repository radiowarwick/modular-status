import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import VNCViewer from "../VNCViewer";
import vncViewerNotes from "../notes/VNCViewer.md";

/**
 * Default story with an default url.
 */
export const vncViewerDefault = {
  wsURL: "ws://status:3000?token=playout1",
  isError: false,
  onError: err => console.log(err.message),
  onReady: () => console.log("Ready")
};

storiesOf("Composite/VNCViewer", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ height: "100vh" }}>{story()}</div>)
  .add(
    "Default",
    () => (
      <VNCViewer
        wsURL={text("url", vncViewerDefault.wsURL)}
        isError={boolean("isError", vncViewerDefault.isError)}
        onReady={vncViewerDefault.onReady}
        onError={vncViewerDefault.onError}
      />
    ),
    { notes: { markdown: vncViewerNotes } }
  );
