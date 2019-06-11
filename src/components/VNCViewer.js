import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import RFB from "@novnc/novnc";

const VNCViewer = ({ url }) => {
  const screenRef = useRef();

  const handleDisconnect = e => console.log("Disconnected!");

  const handleConnect = () => console.log("Connected!");

  useEffect(() => {
    const rfb = new RFB(screenRef.current, url);
    rfb.addEventListener("disconnect", handleDisconnect);
    rfb.addEventListener("connect", handleConnect);
    return () => {
      rfb.disconnect();
      rfb.removeEventListener("disconnect", handleDisconnect);
      rfb.removeEventListener("connect", handleConnect);
    };
  }, [url]);

  return <div ref={screenRef} />;
};

VNCViewer.propTypes = {
  url: PropTypes.string.isRequired
};

export default VNCViewer;
