import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import Headline from "../components/Headline";
import CardList from "../components/CardList";

import icn_clear_day from "../icons/clear-day.svg";
import icn_clear_night from "../icons/clear-night.svg";
import icn_cloudy from "../icons/cloudy.svg";
import icn_default from "../icons/default.svg";
import icn_fog from "../icons/fog.svg";
import icn_partly_cloudy_day from "../icons/partly-cloudy-day.svg";
import icn_partly_cloudy_night from "../icons/partly-cloudy-night.svg";
import icn_rain from "../icons/rain.svg";
import icn_sleet from "../icons/sleet.svg";
import icn_snow from "../icons/snow.svg";
import icn_wind from "../icons/wind.svg";

/**
 * CurrentWeather.js - Returns a formatted representation of the current weather conditions.
 *
 * @param {bool} err - Defines if the component should be in an error state. Error state if true.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const CurrentWeather = ({ err, data }) => {
  const card = {
    id: "weather",
    slim: false,
    data: { imageURL: null, title: null, subtitle: null }
  };

  if (!err && data) {
    card.data.subtitle = data.weather.summary;
    card.data.title = data.weather.temperature + "°C";

    /**
     * The following large and ugly switch statement maps the icon parameter to an actual SVG image.
     */
    switch (data.weather.icon) {
      case "clear-day":
        card.data.imageURL = icn_clear_day;
        break;
      case "clear-night":
        card.data.imageURL = icn_clear_night;
        break;
      case "cloudy":
        card.data.imageURL = icn_cloudy;
        break;
      case "fog":
        card.data.imageURL = icn_fog;
        break;
      case "partly-cloudy-day":
        card.data.imageURL = icn_partly_cloudy_day;
        break;
      case "partly-cloudy-night":
        card.data.imageURL = icn_partly_cloudy_night;
        break;
      case "rain":
        card.data.imageURL = icn_rain;
        break;
      case "sleet":
        card.data.imageURL = icn_sleet;
        break;
      case "snow":
        card.data.imageURL = icn_snow;
        break;
      case "wind":
        card.data.imageURL = icn_wind;
        break;
      default:
        card.data.imageURL = icn_default;
    }
  }

  return (
    <div>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err && data ? (
        <div>
          <Headline value="Weather" />
          <CardList cards={[card]} highlighted={false} />
        </div>
      ) : null}
    </div>
  );
};

CurrentWeather.propTypes = {
  err: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    weather: PropTypes.shape({
      summary: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      precip: PropTypes.number
    }).isRequired
  })
};

export default CurrentWeather;
