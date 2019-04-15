import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import Message from "../Message";

/**
 * Defines a default loader of a reasonable size.
 */
export const messageDefualt = {
  sender: "Student Radio Assoc.",
  origin: "twt",
  subject: "@SRA",
  body: 'Hey!"""""',
  datetime: 5734769
};

storiesOf("Simple/Message", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ marginTop: "1rem" }}>{story()}</div>)
  .add("Default", () => (
    <Message
      sender={text("sender", messageDefualt.sender)}
      origin={text("origin", messageDefualt.origin)}
      subject={text("imageURL", messageDefualt.subject)}
      body={text("body", messageDefualt.body)}
      datetime={number("datetime", messageDefualt.datetime)}
    />
  ));
