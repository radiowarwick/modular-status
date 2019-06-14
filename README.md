# `raw-modular-status`

A modular system to construct and display data from various sources.

_Work In Progress_

View the [Storybook](https://willthevideoman.github.io/raw-modular-status/).

Built with `create-react-app`

### Development

1. `git clone https://github.com/WillTheVideoMan/raw-modular-status.git`
2. `cd raw-modular-status`
3. `npm i`
4. `npm start`
5. Browse to `http://localhost:3000`

### VNC Server Requirements

`src/components/VNCViewer.js` accepts a `wsURL` property which defines a websocket connection. noVNC (a package used in this project) then uses this websocket connection to communicate with the remote machine.

Some VNC servers [have websocket support built in](https://github.com/novnc/noVNC#server-requirements). However, some VNC servers do not. If your VNC server does not support websockets directly, then you must setup a websocket proxy server to tranform and proxy requests over TCP to a downstream VNC server.

Luckily, noVNC has a sister project [websockify](https://github.com/novnc/websockify) which works splendidly for this purpose. You can run it on the same machine as the VNC server itself (pointing to `localhost`), or on an independant proxy server (e.g. if you have multiple VNC servers running on the same network).

To get started:

1. `sudo apt-get update`
2. `sudo apt-get install websockify`

Then launch websockify, specifying a port to run the websocket server from, and the address and port of an existing VNC server instance. The standard VNC port is `5900 + n`, where `n` is the desktop index.

3. `websockify [websocket_port] [vnc_address]:[vnc_port]`

#### Multiple VNC Servers

If you have more than one VNC server running downstream of an independant proxy server, it would make sense to have dynamic downstream VNC host selection based on some sort of token. Websockify [supports such token based VNC host selection](https://github.com/novnc/websockify/wiki/Token-based-target-selection). To get started, we must define a config directory and files:

1. `mkdir /etc/websockify.config.d`
2. `nano /etc/websockify.config.d/config`

The config file may contain one or more lines which link tokens (passed as a URL parameter) with a VNC host + port. The entries to the file must follow the syntax:

`[token_string]: [vnc_address]:[vnc_port]`

Where `[token_string]` is any string which uniquely identifies a VNC host + port combo. The directory can contain one or more of such config files. After defining the tokens, run websockify using token-based host selection:

3. `websockify [websocket_port] --token-plugin TokenFile --token-source /etc/websockify.config.d/`

Specifying the token as a GET parameter then defines which VNC host + port to proxy to:

4. `GET ws://[proxy_ip]:[websocket_port]?token=[token_string]`

#### Running as a service

For production environments, it would make even more sense to run websockify as a service. To accomplish this, you could set up a service in your environment to control the function of websockify. [This site](https://blog.frd.mn/how-to-set-up-proper-startstop-services-ubuntu-debian-mac-windows/) has an excellent tutorial for all environments on how to create a service.

Follow the above guide with the following considerations:

1. Create a system-only user called 'websockify' by running the following command:
   - `adduser -r websockify`
2. Give the 'websockify' user ownership of the websockify binary using the following command:
   - `chown -R websockify:websockify /usr/bin/websockify`
