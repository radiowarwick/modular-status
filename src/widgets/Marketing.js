import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import ImageCylce from "../components/ImageCycle";
import Headline from "../components/Headline";

/**
 * Marketing.js - Returns a constant cycle of marketing images.
 *
 * @param {bool} err - Defines if the component should be in an error state. Error state if true.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const Marketing = ({ err, data }) => {
  let images = [];
  /**
   * If not error, and data is present, transform data.
   * A simple set here, as the data maps directly to the widget.
   */
  if (!err && data) {
    images = data.images;
  }

  /**
   * Returns an animated image cycle with a duration of 20 seconds for each 'slide' in the cycle.
   * Else, widget overlay handles errors and loading.
   */
  return (
    <>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err && data ? (
        <div>
          <Headline value="What's On" />
          <ImageCylce interval={20000} animate={true} images={images} />
        </div>
      ) : null}
    </>
  );
};

Marketing.propTypes = {
  err: PropTypes.object,
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Marketing;
