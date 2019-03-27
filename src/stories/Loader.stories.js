import React from "react";
import { storiesOf } from "@storybook/react";

import Loader from "../components/Loader";

/**
 * Defines a default loader of a reasonable size.
 */
export const loader = {
  size: 1
};

storiesOf("Loader", module).add("Default", () => <Loader size={loader.size} />);
