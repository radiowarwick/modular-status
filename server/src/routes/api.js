const koaRouter = require("koa-router");
const axios = require("axios");
const config = require("../config");

const parseXML = require("xml2js").parseString;
const crypto = require("crypto");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");

const api = new koaRouter();

const endpoints = {
  weather: "https://my.warwick.ac.uk/api/tiles/content/weather",
  bus: "https://my.warwick.ac.uk/api/tiles/content/bus",
  messages: "https://digiplay.radio.warwick.ac.uk/api/message",
  lastplayed: "https://digiplay.radio.warwick.ac.uk/api/log",
  schedule:
    "https://space.radio.warwick.ac.uk/services/public/schedule.php?date=1&period=now/next",
  equipment: "https://space.radio.warwick.ac.uk/space/equipment/"
};

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
      today.getDate(),
      parts[0],
      parts[1],
      0
    ).getTime() / 1000
  );
};

/**
 * Creates a MD5 hash with hex encoding for a given string.
 *
 * @param {string} string - The string to be hashed.
 */
const getHash = string =>
  crypto
    .createHash("md5")
    .update(string)
    .digest("hex");

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
   * Holds the UNIX time that SUE log entries should be re-introduced into the last-played array.
   */
  let sueResumeTime = 0;

  /**
   * The array of last-played songs, initialized empty.
   */
  let lastplayed = [];

  /**
   * Construct an array of last-played songs from the Digiplay song log, logging SUE songs after
   * an hour of no studio(s) logging activity.
   */
  lastplayed = response.data
    /**
     * First, reverse the log array to get the oldest song played in the array head.
     */
    .reverse()
    /**
     * Filter out any SUE log entries that occur within one hour (3600 seconds) of the last non-SUE entry.
     *
     * This allows for dynamic switching between SUE and studio(s) output in any log data. Since each show is
     * one-hour long, we can safely say that after one hour without any studio(s) log entries that SUE is playing on air.
     */
    .filter(logRow => {
      /**
       * If the location is anything but SUE, then it is important and will set a new SUE resume time,
       * which is one hour in the future from the non-SUE location's log time. Include this non-SUE log in
       * the last-played log.
       *
       * Else, if the location is SUE, make sure the SUE resume time has been exceeded before re-introducing SUE
       * to the last-played log.
       *
       * Else, do not include the log entry in the last-played log.
       */
      if (logRow.location !== 0) {
        sueResumeTime = logRow.datetime + 3600;
        return true;
      } else if (logRow.datetime > sueResumeTime) {
        return true;
      } else {
        return false;
      }
    })
    /**
     * For each track that was played, build a last played object.
     *
     * Note, the imageURL is generated dynamically based on artist and title of track.
     */
    .map(logRow => {
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
          encodeURIComponent(logRow.title) +
          ".jpg"
      };
    })
    /**
     * Re-reverse the log array to get the most recent song played in the array head.
     */
    .reverse();

  /**
   * Set the body.
   */
  ctx.body = { success: true, lastplayed: lastplayed };
});

/**
 * Gets the schedule of programming.
 */
api.get("/schedule", async ctx => {
  /**
   * Visits the schedule endpoint and gets some shows!
   */
  const response = await axios.get(endpoints.schedule);

  /**
   * The following function falls outside the codebase style in order to support XML processing in
   * a non async/await paradigm.
   *
   * It extracts and maps the XML show data into a useful schedule object.
   *
   * It parses an XML response using a callback style. It then extracts useful data from the result.
   *
   * The ID of each show is an MD5 hash of show ID with the show start time, since no singular show can
   * ever have the same start time more than once.
   *
   * The UNIX start/stop is built from the returned hour.
   */
  parseXML(response.data, (err, result) => {
    const schedule = result.shows.show.map(slot => {
      return {
        id: "sh_" + getHash(slot.id + slot.start[0]),
        title: slot.name[0],
        unixStart: unixFromTimeString(slot.start[0]),
        unixFinish: unixFromTimeString(slot.end[0]),
        imageURL: config.MEDIA_URL + "/static/shows/" + slot.id + ".jpg"
      };
    });

    ctx.body = { success: true, schedule: schedule };
  });
});

/**
 * Gets the equipment bookings, for any equipment.
 *
 * NOTE: This is a bit of a quirky implementation. It pulls data from a public facing HTML page,
 * and parses it into usable data. Because of this, there are lots of array operations and searching
 * to extract the right data.
 *
 * But it works pretty well. Just be aware that if the HTML changes, this may have to be tweaked.
 */
api.get("/equipment/:name", async ctx => {
  /**
   * Extract the equipment name from the request.
   */
  const name = ctx.params.name;

  /**
   * Visits the equipment endpoint and gets some equipment bookings!
   */
  const response = await axios.get(endpoints.equipment);

  /**
   * Loads the HTML into a traversable DOM we can explore.
   */
  const dom = cheerio.load(response.data);

  /**
   * Wrap the table parser around our DOM representation.
   */
  cheerioTableparser(dom);

  /**
   * Extract the data from the bookings table based some IDs and classes.
   */
  const data = dom("#content .card .table").parsetable();

  /**
   * Extract the time slots of the equipment bookings. The first part of each column is the header,
   * so we slice that out. Then, we map the 12HR format into a 24HR Unix format, and return.
   */
  const timeSlots = data[0].slice(1, data[0].length).map(time => {
    /**
     * Split the time string by the space after the time. Expects `HH:MM am` or `HH:MM pm`,
     * converting to an array of `HH:MM` and `am` or `pm`.
     */
    const stringParts = time.split(" ");

    /**
     * Split the `HH:MM` time part into the parts of the time. Expects `HH:MM`, converting to an
     * integer array of `HH` and `MM`.
     */
    const timeParts = stringParts[0].split(":").map(string => parseInt(string));

    /**
     * If the last part of the time string is after midday, and the hour is not midday or midnight itself, then
     * add 12 hours onto the hour's part of the time string. Converts to 24hr time.
     */
    if (stringParts[1] === "pm" && timeParts[0] !== 12 && timeParts[0] !== 0)
      timeParts[0] += 12;

    /**
     * Join the time parts together in the format that the unix conversion function expects (`HH:MM`).
     * Then, return the UNIX time of the time slot.
     */
    return unixFromTimeString(timeParts.join(":"));
  });

  /**
   * By looking at all the columns of the parsed table, find the 'column' index which holds the
   * data for the given equipment name (lower case for matching purposes).
   */
  const equipmentIndex = data
    .map(column => column[0].toLowerCase())
    .slice(1, data.length)
    .indexOf(name.toLowerCase());

  /**
   * Define an empty array of bookings.
   */
  let bookings = [];

  /**
   * If the equipment is present as a column of data, extract and build the bookings.
   */
  if (equipmentIndex !== -1) {
    /**
     * Gets the current UNIX time.
     */
    const currentTime = Math.floor(Date.now() / 1000);

    /**
     * Loop through each timeslot through the day.
     */
    for (let i = 0; i < timeSlots.length; i++) {
      /**
       * If the slot is equal to or later than the current hour (hence minus 3600 seconds),
       * then add an entry to the booking array.
       */
      if (timeSlots[i] > currentTime - 3600) {
        /**
         * Extract the member from the table data (+1 to remove first row and column).
         */
        const member = data[equipmentIndex + 1][i + 1];

        /**
         * Push a entry to the bookings array. The ID is a hash of member and unix time.
         *
         * If the member is a HTML code for a space, then return null for member.
         */
        bookings.push({
          id: "eq_" + getHash(timeSlots[i] + member),
          unixTime: timeSlots[i],
          member: member === "&#xA0;" ? null : member
        });
      }
    }
  }

  /**
   * Build and return a response.
   */
  const equipment = { name: name, bookings: bookings };

  ctx.body = { success: true, equipment: equipment };
});

/**
 * Returns the URL of the ScreenSaver video and the minute of the hour the video should be played.
 */
api.get("/screensaver", async ctx => {
  ctx.body = {
    success: true,
    screensaver: {
      url:
        "https://media2.radio.warwick.ac.uk/static/video/your_student_radio_station.mp4",
      minuteOfHour: 30
    }
  };
});

/**
 * Export the API routes
 */
module.exports = api;
