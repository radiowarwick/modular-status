import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, object, boolean } from "@storybook/addon-knobs";

import MessageCycle from "../MessageCycle";

/**
 * A Default message cycle.
 */
const messageCycleDefault = {
  interval: 2000,
  animate: true,
  messages: [
    {
      id: "msg_125838",
      origin: "twt",
      sender: "Pierre",
      subject: "@1251time just mentioned us on twitter",
      body:
        "@1251time: .@buczistash good news! It's 12:51, and today you are victRaWrious! Tweet us a request @RaW1251AM #1251time"
    },
    {
      id: "msg_125837",
      origin: "twt",
      sender: "Billy",
      subject: "@billyarnold1999 just mentioned us on twitter",
      body:
        "@billyarnold1999: They were also incredibly nice, and we recorded a great interview that will be on air in term 3 @RAW1251AM"
    },
    {
      id: "msg_125836",
      origin: "twt",
      sender: "Jessica ◟̽◞̽",
      subject: "@happy4tommo just mentioned us on twitter",
      body:
        "@happy4tommo: @RAW1251AM hey! Could you please play @Louis_Tomlinson ‘s new song #TwoOfUs !? Thanks so much :)"
    }
  ]
};

storiesOf("Composite/MessageCycle", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <MessageCycle
      interval={number("interval", messageCycleDefault.interval)}
      animate={boolean("animate", messageCycleDefault.animate)}
      messages={object("messages", messageCycleDefault.messages)}
    />
  ));
