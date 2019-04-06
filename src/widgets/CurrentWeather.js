import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import Headline from "../components/Headline";
import Card from "../components/Card";

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

const CurrentWeather = ({ err, data }) => {
  const cardData = { imageURL: null, title: null, subtitle: null };

  if (!err) {
    cardData.subtitle = data.weather.summary;
    cardData.title = data.weather.temperature + "°C";
    switch (data.weather.icon) {
      case "clear-day":
        cardData.imageURL = icn_clear_day;
        break;
      case "clear-night":
        cardData.imageURL = icn_clear_night;
        break;
      case "cloudy":
        cardData.imageURL = icn_cloudy;
        break;
      case "fog":
        cardData.imageURL = icn_fog;
        break;
      case "partly-cloudy-day":
        cardData.imageURL = icn_partly_cloudy_day;
        break;
      case "partly-cloudy-night":
        cardData.imageURL = icn_partly_cloudy_night;
        break;
      case "rain":
        cardData.imageURL = icn_rain;
        break;
      case "sleet":
        cardData.imageURL = icn_sleet;
        break;
      case "snow":
        cardData.imageURL = icn_snow;
        break;
      case "wind":
        cardData.imageURL = icn_wind;
        break;
      default:
        cardData.imageURL = icn_default;
    }
  }

  return (
    <div>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err ? (
        <div>
          <Headline value="Weather" />
          <Card slim={false} data={cardData} />
        </div>
      ) : null}
    </div>
  );
};

CurrentWeather.propTypes = {
  err: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

export default CurrentWeather;
