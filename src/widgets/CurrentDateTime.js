import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import DateTime from "../components/DateTime";

/**
 * CurrentDateTime.js - Returns the current Date and Time.
 *
 * @param {object} err - Defines if the component should be in an error state. Error state if not null.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const CurrentDateTime = ({ err, data }) => {
  const unixStart = Math.floor(Date.now() / 1000);
  return (
    <>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err && data ? <DateTime unixStart={unixStart} /> : null}
    </>
  );
};

CurrentDateTime.propTypes = {
  err: PropTypes.object,
  data: PropTypes.object
};

export default CurrentDateTime;
