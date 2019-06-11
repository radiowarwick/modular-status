import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import RFB from "@novnc/novnc";

const VNCViewer = ({ wsURL }) => {
  const screenRef = useRef();

  const handleDisconnect = e =>
    console.log("Disconnected! Clean: " + e.detail.clean);

  const handleConnect = () => console.log("Connected!");

  useEffect(() => {
    const rfb = new RFB(screenRef.current, wsURL);
    rfb.addEventListener("disconnect", handleDisconnect);
    rfb.addEventListener("connect", handleConnect);
    return () => {
      rfb.disconnect();
      rfb.removeEventListener("disconnect", handleDisconnect);
      rfb.removeEventListener("connect", handleConnect);
    };
  }, [wsURL]);

  return <div ref={screenRef} />;
};

VNCViewer.propTypes = {
  wsURL: PropTypes.string.isRequired
};

export default VNCViewer;
