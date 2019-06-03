import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import Headline from "../components/Headline";
import CardList from "../components/CardList";

/**
 * Equipment.js - Returns the equipment bookings for any equipment source.
 *
 * @param {bool} err - Defines if the component should be in an error state. Error state if true.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const Equipment = ({ err, data }) => {
  let cards = [];
  /**
   * If not error, and data is present, transform data.
   *
   * The first card is thicc, the rest are slim.
   *
   * Any free slots are dark theme, and the text is written as subtitle instead of title.
   *
   * The tag displays the hour of booking for each slot.
   */
  if (!err && data) {
    cards = data.equipment.bookings.map((booking, index) => {
      return {
        id: booking.id,
        slim: index === 0 ? false : true,
        colourful: false,
        dark: booking.member ? false : true,
        data: {
          tag: new Date(booking.unixTime * 1000).getHours().toString(),
          title: booking.member ? booking.member : null,
          subtitle: !booking.member ? "Avaliable" : null
        }
      };
    });
  }

  /**
   * Returns a cardlist, with the headline based on the equipment name specified
   * in the request URL (see `defaultWidgets.js`)
   *
   * Else, widget overlay handles errors and loading.
   */
  return (
    <div>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err && data ? (
        <div>
          <Headline value={data.equipment.name + " Bookings"} />
          <CardList cards={cards} />
        </div>
      ) : null}
    </div>
  );
};

Equipment.propTypes = {
  err: PropTypes.object,
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    equipment: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bookings: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          unixTime: PropTypes.number.isRequired,
          member: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
};

export default Equipment;
