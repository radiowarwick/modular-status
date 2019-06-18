# VNCViewer

Displays the current desktop from a VNC server with a websocket interface.

The component accepts the following props:

- `wsURL` is the websocket URL string of the VNC server.
- `isError` (boolean) tells the component if it is in an error state, begins auto-reconnect attempts.
- `onError` is a function which is invoked if an internal error occurs.
- `onReady` is a function which is invoked when the component has successfully connected to the VNC server.

Since this is a controlled component, it is expected that the parent component handles the relaying of error information and waits for the `onReady` invocation whilst this component attempts to (re)connect.

### Example

A basic VNC Viewer that is not in an error state, and with 'proper' handler functions:

```javascript
<VNCViewer
    wsURL="ws://status:3000?token=playout1"
    isError={false}
    onError={()=>console.log("Oopsie alert");}
    onReady={()=>console.log("Ready 2 go");}
/>
```

---

## VNC Server Requirements

`src/components/VNCViewer.js` accepts a `wsURL` property which defines a websocket connection that noVNC (a package used in this project) then uses communicate with the remote machine running a VNC server.

Some VNC servers [have websocket support built in](https://github.com/novnc/noVNC#server-requirements). However, some VNC servers do not. If your VNC server does not support websockets directly, then you must setup a websocket proxy server to transform and proxy requests over TCP to a downstream VNC server.

Luckily, noVNC has a sister project [websockify](https://github.com/novnc/websockify) which works splendidly for this purpose. You can run it on the same machine as the VNC server itself (pointing to `localhost`), or on an independant proxy server (e.g. if you have multiple VNC servers running on the same network).

To get started:

1. `sudo apt-get update`
2. `sudo apt-get install websockify`

Then launch websockify, specifying a port to run the websocket server from, and the address and port of an existing VNC server instance. The standard VNC port is `5900 + n`, where `n` is the desktop index.

3. `websockify [websocket_port] [vnc_address]:[vnc_port]`

### Multiple VNC Servers

If you have more than one VNC server running downstream of an independent proxy server, it would make sense to have dynamic downstream VNC host selection based on some sort of token. Websockify [supports such token based VNC host selection](https://github.com/novnc/websockify/wiki/Token-based-target-selection). To get started, we must define a config directory and files:

1. `mkdir /etc/websockify.config.d`
2. `nano /etc/websockify.config.d/config`

The config file may contain one or more lines which link tokens (passed as a URL parameter) with a VNC host + port. The entries to the file must follow the syntax:

`[token_string]: [vnc_address]:[vnc_port]`

Where `[token_string]` is any string which uniquely identifies a VNC host + port combo. The directory can contain one or more of such config files. After defining the tokens, run websockify using token-based host selection:

3. `websockify [websocket_port] --token-plugin TokenFile --token-source /etc/websockify.config.d/`

Specifying the token as a GET parameter then defines which VNC host + port to proxy to:

4. `GET ws://[proxy_ip]:[websocket_port]?token=[token_string]`

### Running as a service

For production environments, it would make even more sense to run websockify as a service. To accomplish this, you could set up a service in your environment to control the function of websockify. [This site](https://blog.frd.mn/how-to-set-up-proper-startstop-services-ubuntu-debian-mac-windows/) has an excellent tutorial for all environments on how to create a service.

Follow the above guide with the following considerations:

1. Create a system-only user called 'websockify' by running the following command:
   - `adduser -r websockify`
2. Give the 'websockify' user ownership of the websockify binary using the following command:
   - `chown -R websockify:websockify /usr/bin/websockify`
