import React, { useState, useEffect, useRef } from "react";
import { useInterval } from "../customHooks";
import styled from "styled-components";
import PropTypes from "prop-types";

import RFB from "@novnc/novnc";

/**
 * VNCViewer.js - Returns a canvas with a live mirror of a defined system's desktop using VNC.
 *
 * @param {string} wsURL - The URL of the websocket server instance.
 * @param {bool} isError - Tells the VNC Viewer if it is in an error state, begins auto-reconnect attempts.
 * @param {func} onError - Invoked when an error occurs.
 * @param {func} onReady - Invoked when the VNC Viewer is ready.
 */
const VNCViewer = ({ wsURL, isError, onError, onReady }) => {
  /**
   * Holds a mutable reference to the canvas' HTML DOM node.
   */
  const screenRef = useRef();

  /**
   * Holds a stateful reference to the number of attempts made to reconnect to the VNC Server
   * whilst in an error state.
   */
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  /**
   * Passes up an error object to the parent components by invoking onError from props.
   *
   * @param {string} message - The verbose representation of the error.
   */
  const handleError = message => onError({ message: message });

  /**
   * Handles any disconnection events from noVNC RFB object instance.
   *
   * @param {obj} e - The event object passed from noVNC.
   */
  const handleDisconnected = e => {
    /**
     * If the disconnection was not clean, then some error occurred. Pass an appropriate error message.
     * Else, it was a clean connection closure. It's not technically an 'error, but nevertheless there is
     * no longer a connection to the VNC instance, so an appropriate error message is passed.
     */
    if (!e.detail.clean) handleError("Could not connect to VNC server.");
    else handleError("Disconnected from VNC server.");
  };

  /**
   * Informs the parent that the VNC server requires credentials to connect.
   * Currently the viewer only allows password-less VNC servers.
   */
  const handleCredsRequired = () =>
    handleError("VNC server requires credentials.");

  /**
   * Informs the parent that some security error occurred during connection setup.
   */
  const handleSecurityFailure = () =>
    handleError("Security failure during connection to VNC server.");

  /**
   * If in an error state, attempt to reconnect every 30 seconds.
   * Reconnection attempts are initiated every time the value of reconnectAttempts changes.
   */
  useInterval(
    () => setReconnectAttempts(reconnectAttempts + 1),
    isError ? 30000 : null
  );

  /**
   * Setup a new Realtime Frame Buffer (RFB) instance, binding event listeners.
   *
   * Returns a cleanup function which removes all event listeners.
   *
   * The effect hook is invoked any time the `wsURL` or `reconnectAttempts` changes.
   */
  useEffect(() => {
    let rfb = new RFB(screenRef.current, wsURL);
    rfb.background = "rgba(0, 0, 0, 0)";
    rfb.scaleViewport = true;
    rfb.clipViewport = true;
    rfb.viewOnly = true;
    rfb.addEventListener("connect", onReady);
    rfb.addEventListener("disconnect", handleDisconnected);
    rfb.addEventListener("credentialsrequired", handleCredsRequired);
    rfb.addEventListener("securityfailure", handleSecurityFailure);

    return () => {
      rfb.disconnect();
      rfb.removeEventListener("connect", onReady);
      rfb.removeEventListener("disconnect", handleDisconnected);
      rfb.removeEventListener("credentialsrequired", handleCredsRequired);
      rfb.removeEventListener("securityfailure", handleSecurityFailure);
      rfb = null;
    };
  }, [wsURL, reconnectAttempts]);

  /**
   * Return the VNC screen.
   */
  return <Screen ref={screenRef} />;
};

VNCViewer.propTypes = {
  wsURL: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  onReady: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};

export default VNCViewer;

/**
 * Define a styled screen.
 *
 * noVNC applies annoying sizing rules, so a lot of the following styled attempt to override this.
 *
 * TODO: Try to improve dynamic sizing of noVNC canvas element.
 */
const Screen = styled.div`
  height: 100%;
  width: calc(100% - 1.6rem);
  margin: 0 0.8rem;

  canvas {
    max-height: 100% !important;
    border-color: var(--accent-colour);
    border-style: solid;
    border-radius: 0.9rem;

    box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
  }
`;
