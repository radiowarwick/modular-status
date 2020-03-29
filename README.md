# `raw-modular-status`

A modular system to construct and display data from various sources.

[//]: # "Begin badges section"

[![create-react-app](https://img.shields.io/badge/npm-create--react--app-brightgreen.svg?colorB=a30308)](https://www.npmjs.com/package/create-react-app)
[![axios](https://img.shields.io/badge/npm-axios-brightgreen.svg?colorB=a30308)](https://www.npmjs.com/package/axios)
[![koa](https://img.shields.io/badge/npm-koa-brightgreen.svg?colorB=a30308)](https://www.npmjs.com/package/koa)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://storybook.js.org/)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

[//]: # "End badges section"

The best way to get started with the project is to view the [Storybook](https://radiowarwick.github.io/modular-status/).

### Development

1. `git clone https://github.com/radiowarwick/modular-status.git`
2. `cd modular-status`
3. `npm i`
4. `npm start`
5. Browse to `http://localhost:3000`

### Production (basic)

1. `git clone https://github.com/radiowarwick/modular-status.git`
2. `cd modular-status`
3. `npm i`
4. `npm run build`
5. `npm run start-server`
5. Browse to `http://localhost:3000`

### Production (docker)
1. Install [Docker CE](https://docs.docker.com/install/).
2. `docker run --publish 8080:8080 --detach --name modular raw1251am/modular-status:latest`
3. Visit server on port `8080`.

## Setting up a Raspberry Pi in Kiosk Mode
If you are setting up a new screen, or re-building an existing screen, then it might make sense to use a Raspberry Pi as a client. However, it might not be the best idea to simply setup an OS with a full GUI, install Google Chrome, and type in the URL. What happens if the Pi reboots? How do you remove the cursor? 

This guide outlines how to setup a pi in kiosk mode, a lightweight way of running this web app by installing only the most crucial parts of a GUI.

### Preparing the Pi

Start with a fresh installation of Raspbian Lite, a lightweight OS with no GUI or excessive packages installed.

[Download](https://www.raspberrypi.org/downloads/raspbian/) the latest version of Raspbian Lite, and burn the image to an SD card. You might want to use [Balena Etcher](https://www.balena.io/etcher/) for this.

Once installed, login using the default username `pi` and password `raspberry`. Next, run command `sudo raspi-config` to setup an initial configuration on the Pi:

- **Localisation Options:** As were in the UK, it's best to keep the default `en_GB.UTF-8`.
- **Change User Password:** Changing the default password will protect the Pi from being _hacked epically_. 
- **Network Options:** Configure WiFi if needed.
- **Boot Options:** Select `desktop/cli` then `console autologin`.
- **Interfacing Options:** Enable SSH to allow remote access to the terminal, enable VNC to allow remote interactions with the chromium window we will setup next. 
- **Advanced Options:** Disable `overscan` if the output from the Pi doesn't quite fill the screen. 

Next reboot the Pi.

We will finish the initial setup by all pre-installed packages to their latest version. Run the following commands: 

`sudo apt-get update`

`sudo apt-get upgrade`

### Preparing the GUI environment.

A classical GUI environment usally consists of 4 parts:

1) **X Server** - A way of getting graphical applications to be shown on a bitmap display in a 'window'.
2) **A Window Manager** - A way of managing those very windows.
3) **A Desktop Environment** - A environment which your windows exist within, usually with some sort of application menu and a taskbar thingy.
4) **A Login Manager** - Managing who has access to the machine.

We don't need a desktop environment because we're only going to be using a single application (Chromium) in full-screen mode. Similarly, we don't need a login manager because we set the Pi to auto-login in the previous step.

So we will just need to setup an X Server (1) and a Window Manager (2). Let's install the required packages: 

`sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox`

Our web browser will be Chromium. It's fast and well maintained. Let's install it:

`sudo apt-get install --no-install-recommends chromium-browser`

### Configuring the Window Manager

We are using OpenBox as our window manager, so let's set it up next. We're going to edit the file `/etc/xdg/openbox/autostart` and replace the content with the following:

```
#Prevent the power management system from blanking the screen.
xset s off
xset s noblank
xset -dpms

#Configure CTRL+ALT+BKSP as the escape key. Disabled by default for security, handy for debugging. 
#setxkbmap -option terminate:ctrl_alt_bksp

#Prevent chrome from showing restore session windows.
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences

#Launch Chromium.
chromium-browser --disable-infobars --kiosk 'http://modular-status-url-here'
```

That's a lot of configuration. But really, all we're doing here is setting up chromium to run without any added extras, preventing any chromium dialogs from getting in the way (by tricking Chromium into thinking it exited cleanly even if it crashes), and preventing the Pi from turning off the screen due to inactivity.

Remember to pass the correct URL to chromium. This is probably `http://status.medianet:8080`.

And that's it! Uncomment the `setxkbmap` line from the config for debugging, and now you can officially start the X Server:

`startx -- -nocursor`

Boom! You will now see the Chromium window showing the modular status web app. Smash `CTRL+ALT+BKSP` to return to the terminal.

### Deploying for Production. 

Obviously, it would be a pain to have to manually run `startx -- -nocursor` every time the Pi boots. Thankfully, there's an easy peasy way to run the `startx` command on boot. 

The terminal automatically runs the user profile script every time the Pi boots. We will leverage this and add the `startx` command to the end of this file, from where it will be run on boot.

 From the home directory, append the following lines to your `.profile` or `.bash_profile`:

```
#Start the X Server
[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx -- -nocursor
```

That conditional statement beforehand checks to make sure that only the first terminal window launches the X Server, and to make sure the X Server is not already running. This means you can still use over terminal windows to make changes on the Pi.

When deploying for production, it would be a good idea to re-comment out the `setxkbmap` line from the OpenBox config file to stop a naughty person having access to the Pi if they get their hands on a keyboard.

And that's it! The Pi is now ready for production. 

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