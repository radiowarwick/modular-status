import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import BusTimes from "../BusTimes";

/**
 * A default bus with 5 departures.
 */
export const busTimesDefault = {
  err: null,
  data: {
    success: true,
    busses: [
      {
        id: "bus_7afbaec28cbb4faedd5efe535e685f74",
        callout: "17:09",
        destination: "Warwick Gates, Warwick",
        service: "U1"
      },
      {
        id: "bus_3006948e215a121a02e8fc9b0423ddb6",
        callout: "17:14",
        destination: "Longford, Coventry",
        service: "60"
      },
      {
        id: "bus_41fdd6a7b6468b6fc0549b48ec33ca49",
        callout: "17:15",
        destination: "Coventry",
        service: "12X"
      }
    ]
  }
};

storiesOf("Widgets/BusTimes", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <BusTimes
      err={object("err", busTimesDefault.err)}
      data={object("data", busTimesDefault.data)}
    />
  ));
