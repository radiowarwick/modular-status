import React, { useState } from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import Headline from "../components/Headline";
import VNCViewer from "../components/VNCViewer";

/**
 * PlayoutViewer.js - Returns a live version of the Studio Playout software using VNC.
 *
 * Note, any errors arise internally, so there is no error object required for this widget.
 *
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const PlayoutViewer = ({ data }) => {
  /**
   * Defines if the child VNC Viewer is in an error state.
   */
  const [error, setError] = useState(null);

  /**
   * Returns a VNC Viewer component wrapped in an div with 100% height of the widget's container.
   *
   * The VNC Viewer exposes functions which tell us about it's state. These are used to inform the widget
   * of any errors so that the Widget Overlay can display relevant error info if needed.
   *
   * Note the component is still mounted even in an error state. This is because the VNC viewer attempts automatic
   * reconnection internally.
   */
  return (
    <>
      <WidgetOverlay error={error} loading={data ? false : true} />
      <Headline value={data ? data.playout.name : "Playout"} />
      {data ? (
        <div style={{ height: "calc(100% - 4.8rem)" }}>
          <VNCViewer
            wsURL={data.playout.wsURL}
            isError={error ? true : false}
            onError={err => setError(err)}
            onReady={() => setError(null)}
          />
        </div>
      ) : null}
    </>
  );
};

PlayoutViewer.propTypes = {
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    playout: PropTypes.shape({
      name: PropTypes.string.isRequired,
      wsURL: PropTypes.string.isRequired
    }).isRequired
  })
};

export default PlayoutViewer;
