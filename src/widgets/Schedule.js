import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import Headline from "../components/Headline";
import CardList from "../components/CardList";

/**
 * Schedule.js - Returns the current scheduled shows as a cardlist.
 *
 * @param {bool} err - Defines if the component should be in an error state. Error state if true.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const Template = ({ err, data }) => {
  let cards = [];

  /**
   * A wrapper for the locale time string method, this returns an properly formatted string
   * in the format HH:MM based on a UNIX formatted time.
   *
   * @param {number} unix - the UNIX input.
   */
  const unixToString = unix =>
    new Date(unix * 1000).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    });

  /**
   * If not error, and data is present, transform data.
   *
   * The first card will be thicc, the rest slim. Not colourful. The subtitle gives the time,
   * which is based on the UNIX start/stop times, and a dash in the middle. The image is the image.
   */
  if (!err && data) {
    cards = data.schedule.map((slot, index) => {
      return {
        id: slot.id,
        slim: index === 0 ? false : true,
        colourful: true,
        data: {
          title: slot.title,
          subtitle:
            unixToString(slot.unixStart) +
            " - " +
            unixToString(slot.unixFinish),
          imageURL: slot.imageURL
        }
      };
    });
  }

  /**
   * If there is no error, and plenty of cool data, then return a card list of show time slots.
   * Else, widget overlay handles errors and loading.
   */
  return (
    <>
      <WidgetOverlay error={err} loading={data ? false : true} />
      <Headline value="On Air" />
      {!err && data ? <CardList cards={cards} /> : null}
    </>
  );
};

Template.propTypes = {
  err: PropTypes.object,
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        unixStart: PropTypes.number.isRequired,
        unixFinish: PropTypes.number.isRequired,
        imageURL: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Template;
