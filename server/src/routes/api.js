const koaRouter = require("koa-router");
const axios = require("axios");
const config = require("../config");

const parseXML = require("xml2js").parseString;
const crypto = require("crypto");

const api = new koaRouter();

const endpoints = {
  weather: "https://my.warwick.ac.uk/api/tiles/content/weather",
  bus: "https://my.warwick.ac.uk/api/tiles/content/bus",
  messages: "https://digiplay.radio.warwick.ac.uk/api/message",
  lastplayed: "https://digiplay.radio.warwick.ac.uk/api/log",
  schedule:
    "https://space.radio.warwick.ac.uk/services/public/schedule.php?date=1&period=now/next",
  equipment: ""
};

/**
 * Returns the next busses to depart.
 * Transforms the data from the external API into a consistent data set.
 */
api.get("/bus", async ctx => {
  /**
   * Visit the endpoint and get the data as JSON.
   */
  const response = await axios.get(endpoints.bus);

  /**
   * For each bus, build an transform the API response into our required data strucuture.
   */
  const busses = response.data.data.bus.content.items.map(bus => {
    /**
     * Split the bus's useless text string property into induvidual words.
     */
    const textArray = bus.text.split(" ");

    /**
     * The bus service is always the first word in the sentence.
     */
    const service = textArray[0];

    /**
     * The destination is any words after the single word "to".
     */
    const destination = textArray.slice(textArray.indexOf("to") + 1).join(" ");

    /**
     * Build the bus object.
     */
    return {
      id: "bus_" + bus.id,
      callout: bus.callout,
      destination: destination,
      service: service
    };
  });

  /**
   * Set the body.
   */
  ctx.body = { success: true, busses: busses };
});

/**
 * Returns the current weather.
 * Transforms the data from the external API into a consistent data set.
 */
api.get("/weather", async ctx => {
  /**
   * Visit the weather API endpoint, and get some data.
   */
  const response = await axios.get(endpoints.weather);

  /**
   * For convenience, the actual weather content is extracted before building the response object.
   */
  const content = response.data.data.weather.content;

  /**
   * Build the response object. Round temperature.
   * Only include precipitation if present in the next 'forecasted' weather slot.
   */
  const weather = {
    summary: content.currentConditions.summary,
    temperature: Math.round(content.currentConditions.temperature),
    icon: content.currentConditions.icon,
    precip: content.items.length > 0 ? content.items[0].precipProbability : null
  };

  /**
   * Set the body.
   */
  ctx.body = { success: true, weather: weather };
});

/**
 * Returns an array or images based on image group (e.g. marketing).
 */
api.get("/images/:group", async ctx => {
  let images = null;

  /**
   * Visit the media server's describe endpoint to learn about the images avaliable.
   */
  const response = await axios.get(
    config.MEDIA_URL + "/describe/" + ctx.params.group.toLowerCase()
  );

  /**
   * If the response is godd, build up the media URLs and then an array of images.
   */
  if (response.data.success) {
    const baseURL = config.MEDIA_URL + response.data.path;
    images = response.data.files.map((file, index) => ({
      id: "img_" + index,
      url: baseURL + encodeURIComponent(file)
    }));
  }

  /**
   * Set the body.
   */
  ctx.body = { success: true, images: images };
});

/**
 * Fetches the studio messages.
 */
api.get("/messages", async ctx => {
  /**
   * Visits the messages endpoint and gets some messages.
   */
  const response = await axios.get(endpoints.messages, {
    params: { key: config.RAW_API_KEY }
  });

  /**
   * For each returned message, build a message object up...
   */
  const messages = response.data.map(message => {
    /**
     * Default message origin is from the website.
     */
    let origin = "web";

    /**
     * Get each character of the sender string into an array.
     * Mark where the start of the origin indicator begins.
     *
     * EG:
     * message.sender = hello <website>
     * senderChars = ['h','e','l','l','o',' ','<','w','e','b','s','i','t','e','>']
     * indexOfOriginStart = 6;
     */
    const senderChars = message.sender.split("");
    const indexOfOriginStart = senderChars.indexOf("<");

    /**
     * If the section of the message which denotes the origin is equal to the twitter email,
     * set origin to twitter (set at "twt").
     */
    if (
      senderChars
        .slice(indexOfOriginStart)
        .join("")
        .trim() === "<notify@twitter.com>"
    )
      origin = "twt";

    /**
     * Build the sender string, as everything up to and including the begining of the origin region.
     */
    const sender = senderChars
      .slice(0, indexOfOriginStart)
      .join("")
      .trim();

    /**
     * Return a message object.
     */
    return {
      id: "msg_" + message.id,
      origin: origin,
      sender: sender,
      subject: message.subject,
      body: message.body,
      datetime: message.datetime
    };
  });

  /**
   * Set the body.
   */
  ctx.body = { success: true, messages: messages };
});

/**
 * Gets the last played tracks.
 */
api.get("/lastplayed", async ctx => {
  /**
   * Visits the last played endpoint and gets some tracks!
   */
  const response = await axios.get(endpoints.lastplayed, {
    params: { key: config.RAW_API_KEY }
  });

  /**
   * For each track that was played, build a last played object.
   *
   * Note, the imageURL is generated dynamically based on artist and title of track.
   */
  const lastplayed = response.data.map(logRow => {
    return {
      id: "lp_" + logRow.id,
      time: logRow.datetime,
      title: logRow.title,
      artist: logRow.artist,
      imageURL:
        config.MEDIA_URL +
        "/music/track/" +
        encodeURIComponent(logRow.artist) +
        "/" +
        encodeURIComponent(logRow.title)
    };
  });

  /**
   * Set the body.
   */
  ctx.body = { success: true, lastplayed: lastplayed };
});

/**
 * Gets the schedule of programming.
 *
 * TODO - implement when endpoint becomes avaliable.
 */
api.get("/schedule", async ctx => {
  /**
   * Visits the schedule endpoint and gets some shows!
   */
  const response = await axios.get(endpoints.schedule);

  /**
   * Converts a string representation of the time into UNIX format, using today's date for the year, month and day.
   * It uses the hour and minute of the passed string to - wait for it - define the hour and minute.
   *
   * @param {string} timeString - A string representing the current time (ignores seconds), format: HH:MM:SS
   */
  const unixFromTimeString = timeString => {
    const parts = timeString.split(":");
    const today = new Date();
    return (
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDay(),
        parts[0],
        parts[1],
        0
      ).getTime() / 1000
    );
  };

  const idFromImageURL = imageURL => {
    const parts = imageURL.split("/");
    return parts[parts.length - 1].split(".")[0];
  };

  /**
   * Ugly. Disgusting. Bad.
   *
   * Whilst these may sound like words that describe the Author, they infact refer to the below function.
   *
   * It parses an XML response (urgh) using a callback style, instead of the much nicer async/await style
   * of the rest of this document. It then extracts useful data from the (badly structured) result.
   *
   * The ID of each show is just a MD5 hash of the entire JSON result. Not cool, bro.
   *
   * The UNIX start/stop is built from the returned hour.
   */
  parseXML(response.data, (err, result) => {
    const schedule = result.shows.show.map(slot => {
      return {
        id:
          "sh_" +
          crypto
            .createHash("md5")
            .update(JSON.stringify(slot))
            .digest("hex"),
        title: slot.name[0],
        unixStart: unixFromTimeString(slot.start[0]),
        unixFinish: unixFromTimeString(slot.end[0]),
        imageURL:
          config.MEDIA_URL +
          "/static/shows/" +
          idFromImageURL(slot.images[0].large[0])
      };
    });

    ctx.body = { success: true, schedule: schedule };
  });
});

/**
 * Gets the equipment bookings.
 *
 * TODO - implement when endpoint becomes avaliable.
 */
api.get("/equipment", async ctx => {
  ctx.body = { success: true, equipment: null };
});

/**
 * Returns the URL of the ScreenSaver video and the minuite of the hour the video should be played.
 *
 * TODO - implement when endpoint becomes avaliable.
 */
api.get("/screensaver", async ctx => {
  ctx.body = {
    success: true,
    screensaver: {
      url: "https://media.radio.warwick.ac.uk/video/timelapse.mp4",
      minuteOfHour: 30
    }
  };
});

/**
 * Export the API routes
 */
module.exports = api;
