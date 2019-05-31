import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import VideoOverlay from "../VideoOverlay";

/**
 * Default story with
 */
export const videoOverlayDefault = {
  src: "https://media.radio.warwick.ac.uk/video/timelapse.mp4",
  handleEnded: () => console.log("ended")
};

storiesOf("Composite/VideoOverlay", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ height: "100vh" }}>{story()}</div>)
  .add("Default", () => (
    <VideoOverlay
      src={text("src", videoOverlayDefault.src)}
      handleEnded={videoOverlayDefault.handleEnded}
    />
  ));
