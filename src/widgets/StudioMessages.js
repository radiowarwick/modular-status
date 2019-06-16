import React from "react";
import PropTypes from "prop-types";

import WidgetOverlay from "../components/WidgetOverlay";
import Headline from "../components/Headline";
import MessageCycle from "../components/MessageCycle";

/**
 * StudioMessages.js - Returns a constantly cycling display of studio messages.
 *
 * @param {object} err - Defines if the component should be in an error state. Error state if not null.
 * @param {object} data - Defines the data to the transformed by the widget. Loading state if null.
 */
const StudioMessages = ({ err, data }) => {
  /**
   * Define an empty message array.
   */
  let messages = [];
  /**
   * If not error, and data is present, transform data.
   */
  if (!err && data) messages = data.messages;

  /**
   * TODO: describe.
   * Else, widget overlay handles errors and loading.
   */
  return (
    <>
      <WidgetOverlay error={err} loading={data ? false : true} />
      <Headline value="Studio Messages" />
      {!err && data ? (
        <MessageCycle interval={20000} animate={true} messages={messages} />
      ) : null}
    </>
  );
};

StudioMessages.propTypes = {
  err: PropTypes.object,
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        origin: PropTypes.string.isRequired,
        sender: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        datetime: PropTypes.number.isRequired
      })
    ).isRequired
  })
};

export default StudioMessages;
