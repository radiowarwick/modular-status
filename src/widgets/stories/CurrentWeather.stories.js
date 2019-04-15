import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";

import CurrentWeather from "../CurrentWeather";

/**
 * Default current weather component, with no error and example dataset.
 */
export const currentWeatherDefault = {
  err: null,
  data: {
    success: true,
    weather: {
      summary: "Partly Cloudy",
      temperature: 10.79,
      icon: "partly-cloudy-day",
      precip: 0.02
    }
  }
};

storiesOf("Widgets/CurrentWeather", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <CurrentWeather
      err={object("err", currentWeatherDefault.err)}
      data={object("data", currentWeatherDefault.data)}
    />
  ));
