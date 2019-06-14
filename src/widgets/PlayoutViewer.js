import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import Headline from "../components/Headline";
import VNCViewer from "../components/VNCViewer";

/**
 * PlayoutViewer.js -
 *
 * @param {bool} err - Defines if the component should be in an error state. Error state if true.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const PlayoutViewer = ({ err, data }) => {
  let wsURL = "ws://status:3000?token=";
  /**
   * If not error, and data is present, transform data.
   */
  if (!err && data) {
    wsURL += data.playout.token;
  }

  /**
   * TODO: describe.
   * Else, widget overlay handles errors and loading.
   */
  return (
    <>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err && data ? (
        <div style={{ height: "100%" }}>
          <Headline value={data.playout.name} />
          <VNCViewer wsURL={wsURL} />
        </div>
      ) : null}
    </>
  );
};

PlayoutViewer.propTypes = {
  err: PropTypes.object,
  data: PropTypes.object
};

export default PlayoutViewer;
