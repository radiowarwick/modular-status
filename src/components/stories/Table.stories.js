import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, array } from "@storybook/addon-knobs";

import Table from "../Table";

export const tableDefault = {
  headings: [null, "Studio 2", "Tascam"],
  rows: [["08:00", "Will Hall", "-"], ["09:00", "Barnany Merrill", "-"]]
};

storiesOf("Simple/Table", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Table
      headings={array("headings", tableDefault.headings)}
      rows={tableDefault.rows}
    />
  ));
