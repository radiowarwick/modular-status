import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";
import { useInterval } from "../useInterval";

import Message from "./Message";

/**
 * MessageCycle.js - Returns an infinite cycle of messages, that can animate if you like.
 *
 * @param {number} interval - The interval at which the messages update.
 * @param {bool} animate - Defines if the components should animate.
 * @param {array} messages - The array of messages to display.
 */
const MessageCycle = ({ interval, animate, messages }) => {
  /**
   * Define index to hold a reference to the currently displayed message.
   */
  const [index, setIndex] = useState(0);

  /**
   * Update the index over time.
   */
  useInterval(() => {
    setIndex((index + 1) % messages.length);
  }, interval);

  /**
   * Define the initial animations. Start small and transparent, then full-size and opaque.
   * Will not animate if `animate` is false.
   */
  const transitions = useTransition(messages[index], messages[index].id, {
    from: {
      opacity: 0,
      transform: index % 2 === 0 ? "translateX(8rem)" : "translateX(-8rem)",
      height: 0
    },
    enter: { opacity: 1, transform: "translateX(0rem)", height: "auto" },
    leave: { opacity: 0, transform: "translateX(-8rem)", height: 0 },
    config: { mass: 3, tension: 85, friction: 18 },
    immediate: !animate
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      <Message
        sender={item.sender}
        origin={item.origin}
        subject={item.subject}
        body={item.body}
        datetime={item.datetime}
      />
    </animated.div>
  ));
};

MessageCycle.propTypes = {
  interval: PropTypes.number.isRequired,
  animate: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      origin: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      datetime: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

export default MessageCycle;
