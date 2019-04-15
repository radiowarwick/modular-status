import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import StuidoMessages from "../StudioMessages";

/**
 * A default set of messages.
 */
export const studioMessagesDefault = {
  err: null,
  data: {
    success: true,
    messages: [
      {
        id: "msg_125845",
        origin: "web",
        sender: "Cool Message Test",
        subject: "Message from Website",
        body: "Epic Test Alert...",
        datetime: 1555335508
      },
      {
        id: "msg_125844",
        origin: "twt",
        sender: "Pierre",
        subject: "@1251time just mentioned us on twitter",
        body:
          "@1251time: .@tabib910 good news! It's 12:51, and today you are victRaWrious! Tweet us a request @RaW1251AM #1251time",
        datetime: 1555329122
      },
      {
        id: "msg_125843",
        origin: "twt",
        sender: "Dave",
        subject: "@dflite just mentioned us on twitter",
        body:
          "@dflite: @RAW1251AM Hi. I understand you're looking for past members to talk about the station for the 50th anniversary? Programme Controller 95-97 here.. and I have a few more people also interested in contributing.",
        datetime: 1555314363
      }
    ]
  }
};

storiesOf("Widgets/StudioMessages", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <StuidoMessages
      err={object("err", studioMessagesDefault.err)}
      data={object("data", studioMessagesDefault.data)}
    />
  ));
