import React from "react";
import { storiesOf } from "@storybook/react";

import Headline from "../components/Headline";

export const headline = {
  value: "Big Important Text"
};

storiesOf("Headline", module).add("Default", () => (
  <Headline value={headline.value} />
));
