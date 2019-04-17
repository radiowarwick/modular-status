import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import ImageCylce from "../components/ImageCycle";
import Headline from "../components/Headline";

/**
 * Webcams.js - Returns a cycle between an array of studio webcams.
 *
 * @param {bool} err - Defines if the component should be in an error state. Error state if true.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const Webcams = ({ err, data }) => {
  let images = [];
  /**
   * If not error, and data is present, transform data.
   * A simple set here, as the data maps directly to the widget.
   */
  if (!err && data) {
    images = data.webcam.images;
  }
  /**
   * Returns an animated image cycle with a duration of 10 seconds for each webcam on display.
   * Else, widget overlay handles errors and loading.
   */
  return (
    <div>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err && data ? (
        <div>
          <Headline value={data.webcam.name} />
          <ImageCylce
            interval={10000}
            animate={false}
            forceFetch={true}
            images={images}
          />
        </div>
      ) : null}
    </div>
  );
};

Webcams.propTypes = {
  err: PropTypes.object,
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    webcam: PropTypes.shape({
      code: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  })
};

export default Webcams;
