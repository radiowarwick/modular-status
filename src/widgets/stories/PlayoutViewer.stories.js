import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import PlayoutViewer from "../PlayoutViewer";

/**
 * A default set of schedules shows.
 */
export const scheduleDefault = {
  err: null,
  data: {
    success: true,
    playout: {
      name: "Playout 1",
      token: "playout1"
    }
  }
};

storiesOf("Widgets/PlayoutViewer", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <PlayoutViewer
      err={object("err", scheduleDefault.err)}
      data={object("data", scheduleDefault.data)}
    />
  ));
