import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import Headline from "../components/Headline";
import CardList from "../components/CardList";

/**
 * LastPlayed.js -
 *
 * @param {bool} err - Defines if the component should be in an error state. Error state if true.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const LastPlayed = ({ err, data }) => {
  let cards = [];

  /**
   * If not error, and data is present, transform data.
   *
   * Generate an array of cards, which are all colourful and not slim.
   */
  if (!err && data) {
    cards = data.lastplayed.map((track, index) => {
      return {
        id: track.id,
        slim: index === 0 ? false : true,
        colourful: true,
        data: {
          title: track.title,
          subtitle: track.artist,
          imageURL: track.imageURL
        }
      };
    });
  }

  /**
   * Return a colourful CardList with the last played tracks.
   *
   * Else, widget overlay handles errors and loading.
   */
  return (
    <>
      <WidgetOverlay error={err} loading={data ? false : true} />
      <Headline value="Last Played" />
      {!err && data ? <CardList cards={cards} /> : null}
    </>
  );
};

LastPlayed.propTypes = {
  err: PropTypes.object,
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    lastplayed: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired
      })
    ).isRequired
  })
};

export default LastPlayed;
