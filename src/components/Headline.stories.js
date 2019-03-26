import React from "react";
import { storiesOf } from "@storybook/react";

import Headline from "./Headline";

export const headline = {
  value: "Big Important Text"
};

storiesOf("Headline", module).add("default", () => (
  <Headline value={headline.value} />
));
