import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import PlayoutViewer from "../PlayoutViewer";

/**
 * A default playout data-set.
 */
export const playoutDefault = {
  err: null,
  data: {
    success: true,
    playout: {
      name: "Playout 1",
      wsURL: "ws://status:3000?token=playout1"
    }
  }
};

/**
 * Studio 2's playout data set.
 */
export const playoutStudio2 = {
  err: null,
  data: {
    success: true,
    playout: {
      name: "Playout 2",
      wsURL: "ws://status:3000?token=playout2"
    }
  }
};

storiesOf("Widgets/PlayoutViewer", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ height: "100vh" }}>{story()}</div>)
  .add("Default", () => (
    <PlayoutViewer
      err={object("err", playoutDefault.err)}
      data={object("data", playoutDefault.data)}
    />
  ))
  .add("Studio 2", () => (
    <PlayoutViewer err={playoutStudio2.err} data={playoutStudio2.data} />
  ));
