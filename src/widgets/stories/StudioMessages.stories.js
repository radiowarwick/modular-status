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
        id: "msg_125840",
        origin: "web",
        sender: "Test",
        subject: "A Test",
        body: 'Hey!"""""\'<><>%£%""\''
      },
      {
        id: "msg_125839",
        origin: "web",
        sender: "Test",
        subject: "A Test",
        body: 'Hey!"""""'
      },
      {
        id: "msg_125838",
        origin: "twt",
        sender: "Pierre",
        subject: "@1251time just mentioned us on twitter",
        body:
          "@1251time: .@buczistash good news! It's 12:51, and today you are victRaWrious! Tweet us a request @RaW1251AM #1251time"
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
