import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import CardList from "../components/CardList";
import Headline from "../components/Headline";

/**
 * Bus Time.js - Returns an animated list of Bus Times.
 *
 * @param {bool} err - Defines if the component should be in an error state. Error state if true.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const BusTimes = ({ err, data }) => {
  /**
   * Define a null cards array.
   */
  let cards = [];

  /**
   * If not error, and data is present, transform it.
   */
  if (!err && data) {
    /**
     * Transforms the data into cards, passing unique bus IDs and the departure info to induvidual cards.
     *
     * The first card (the next bus to depart) will be larger than (non-slim) the others.
     */
    cards = data.busses.map((bus, index) => {
      return {
        id: bus.id,
        slim: index === 0 ? false : true,
        colourful: false,
        data: {
          tag: bus.service,
          title: bus.callout,
          subtitle: bus.destination
        }
      };
    });
  }

  /**
   * Returns a Cardlist of busses.
   * Else, widget overlay handles errors and loading.
   */
  return (
    <>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err && data ? (
        <div>
          <Headline value="Bus Departures" />
          <CardList cards={cards} highlighted={false} />
        </div>
      ) : null}
    </>
  );
};

BusTimes.propTypes = {
  err: PropTypes.object,
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    busses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        callout: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
        service: PropTypes.string.isRequired
      })
    ).isRequired
  })
};

export default BusTimes;
