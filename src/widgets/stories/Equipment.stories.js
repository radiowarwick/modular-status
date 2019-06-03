import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";
import Equipment from "../Equipment";

/**
 * A default set of equipment bookings.
 */
export const equipmentDefault = {
  err: null,
  data: {
    success: true,
    equipment: {
      name: "Studio 2",
      bookings: [
        {
          id: "bk_420691",
          unixTime: 1552291200,
          member: "Ed Farrar"
        },
        {
          id: "bk_420692",
          unixTime: 1552294800,
          member: "Joe Spagetti"
        },
        {
          id: "bk_420693",
          unixTime: 1552298400,
          member: null
        },
        {
          id: "bk_420694",
          unixTime: 1552302000,
          member: null
        },
        {
          id: "bk_420695",
          unixTime: 1552305600,
          member: "Charlie Peters"
        }
      ]
    }
  }
};

storiesOf("Widgets/Equipment", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Equipment
      err={object("err", equipmentDefault.err)}
      data={object("data", equipmentDefault.data)}
    />
  ));
