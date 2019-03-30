import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import Message from "../components/Message";

/**
 * Defines a default loader of a reasonable size.
 */
export const messageDefualt = {
  sender: "Student Radio Assoc.",
  origin: "@SRA",
  imageURL:
    "https://seeklogo.com/images/T/twitter-2012-negative-logo-5C6C1F1521-seeklogo.com.png",
  body:
    "@RAW1251AM have a Show Development Team.\n\nThey develop shows.\n\nAnd get nominated for #ILSR awards \n\n\ud83d\ude4cTHIS https://t.co/CbsjmYzx39"
};

storiesOf("Simple/Message", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ marginTop: "1rem" }}>{story()}</div>)
  .add("Default", () => (
    <Message
      sender={text("sender", messageDefualt.sender)}
      origin={text("origin", messageDefualt.origin)}
      imageURL={text("imageURL", messageDefualt.imageURL)}
      body={text("body", messageDefualt.body)}
    />
  ));
