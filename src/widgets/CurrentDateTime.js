import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import DateTime from "../components/DateTime";

const CurrentDateTime = ({ err, data }) => {
  const unixStart = Math.floor(Date.now() / 1000);
  return (
    <div>
      <WidgetOverlay error={err} loading={data ? false : true} />
      {!err ? <DateTime unixStart={unixStart} /> : null}
    </div>
  );
};

CurrentDateTime.propTypes = {
  err: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired
};

export default CurrentDateTime;
