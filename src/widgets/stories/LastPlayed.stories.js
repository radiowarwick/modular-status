import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";
import LastPlayed from "../LastPlayed";

/**
 * A default set of last played tracks.
 */
export const lastPlayedDefault = {
  err: null,
  data: {
    success: true,
    lastplayed: [
      {
        id: "lp_3026334",
        time: 1555453739,
        title: "Like I Can",
        artist: "Sam Smith",
        imageURL:
          "https://media2.radio.warwick.ac.uk/lastfm/track/Sam%20Smith/Like%20I%20Can"
      },
      {
        id: "lp_3026333",
        time: 1555453503,
        title: "Sight of You",
        artist: "Sigrid",
        imageURL:
          "https://media2.radio.warwick.ac.uk/lastfm/track/Sigrid/Sight%20of%20You"
      },
      {
        id: "lp_3026332",
        time: 1555453326,
        title: "Let's Dance To Joy Division",
        artist: "Wombats, The",
        imageURL:
          "https://media2.radio.warwick.ac.uk/lastfm/track/Wombats%2C%20The/Let's%20Dance%20To%20Joy%20Division"
      }
    ]
  }
};

storiesOf("Widgets/LastPlayed", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <LastPlayed
      err={object("err", lastPlayedDefault.err)}
      data={object("data", lastPlayedDefault.data)}
    />
  ));
