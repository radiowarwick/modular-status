import React, { useState, useEffect, useRef } from "react";
import { useInterval } from "../customHooks";
import styled from "styled-components";
import PropTypes from "prop-types";

import RFB from "@novnc/novnc";

const VNCViewer = ({ wsURL }) => {
  const [error, setError] = useState();
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const screenRef = useRef();

  const handleError = message => setError({ message: message });

  const handleConnected = () => setError(null);

  const handleDisconnected = e => {
    if (!e.detail.clean) handleError("Could not connect to VNC server.");
  };

  const handleCredsRequired = () =>
    handleError("VNC server requires credentials.");

  const handleSecurityFailure = () =>
    handleError("Security failure during connection to VNC server.");

  useInterval(
    () => setReconnectAttempts(reconnectAttempts + 1),
    error ? 30000 : null
  );

  useEffect(() => {
    let rfb = new RFB(screenRef.current, wsURL);
    rfb.background = "rgba(0, 0, 0, 0)";
    rfb.scaleViewport = true;
    rfb.clipViewport = true;
    rfb.viewOnly = true;
    rfb.addEventListener("connect", handleConnected);
    rfb.addEventListener("disconnect", handleDisconnected);
    rfb.addEventListener("credentialsrequired", handleCredsRequired);
    rfb.addEventListener("securityfailure", handleSecurityFailure);
    return () => {
      rfb.disconnect();
      rfb.removeEventListener("connect", handleConnected);
      rfb.removeEventListener("disconnect", handleDisconnected);
      rfb.removeEventListener("credentialsrequired", handleCredsRequired);
      rfb.removeEventListener("securityfailure", handleSecurityFailure);
      rfb = null;
    };
  }, [wsURL, reconnectAttempts]);

  return <Screen ref={screenRef} />;
};

VNCViewer.propTypes = {
  wsURL: PropTypes.string.isRequired
};

export default VNCViewer;

const Screen = styled.div`
  height: calc(100% - 5.6rem);
  width: calc(100% - 1.6rem);
  margin: 0 0.8rem;

  canvas {
    height: 100% !important;
    width: 100% !important;
    border-color: var(--accent-colour);
    border-style: solid;
    border-radius: 0.9rem;

    box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
  }
`;
