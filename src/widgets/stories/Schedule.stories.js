import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import Schedule from "../Schedule";

/**
 * A default set of schedules shows.
 */
export const scheduleDefault = {
  err: null,
  data: {
    success: true,
    schedule: [
      {
        id: "sh_3026334",
        title: "Girl Talk",
        unixStart: 1552327200,
        unixFinish: 1552330800,
        imageURL: "https://media.radio.warwick.ac.uk/shows/5318.large.jpg"
      },
      {
        id: "sh_3026333",
        title: "Seoul Reflections",
        unixStart: 1552330800,
        unixFinish: 1552334400,
        imageURL: "https://media.radio.warwick.ac.uk/shows/5334.large.jpg"
      }
    ]
  }
};

storiesOf("Widgets/Schedule", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Schedule
      err={object("err", scheduleDefault.err)}
      data={object("data", scheduleDefault.data)}
    />
  ));
