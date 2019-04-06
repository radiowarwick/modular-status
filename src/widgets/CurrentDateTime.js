import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import DateTime from "../components/DateTime";

/**
 * CurrentDateTime.js - Returns the current Date and Time.
 *
 * @param {bool} err - Defines if the component should be in an error state. Error state if true.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const CurrentDateTime = ({ err, data }) => {
  const unixStart = Math.floor(Date.now() / 1000);
  return (
    <div>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err && data ? <DateTime unixStart={unixStart} /> : null}
    </div>
  );
};

CurrentDateTime.propTypes = {
  err: PropTypes.bool.isRequired,
  data: PropTypes.object
};

export default CurrentDateTime;
