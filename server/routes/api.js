const koaRouter = require("koa-router");
const axios = require("axios");

const api = new koaRouter();

const endpoints = {
  weather: "https://my.warwick.ac.uk/api/tiles/content/weather",
  bus: "https://my.warwick.ac.uk/api/tiles/content/bus",
  messages: "https://beta.radio.warwick.ac.uk/api/message",
  lastplayed: "https://beta.radio.warwick.ac.uk/api/log",
  schedule: "",
  equipment: ""
};

/**
 * Returns the next busses to depart.
 * Transforms the data from the external API into a consistent data set.
 */
api.get("/bus", async ctx => {
  const response = await axios.get(endpoints.bus);
  const json = response.data;

  const busses = json.data.bus.content.items.map(bus => {
    const textArray = bus.text.split(" ");
    const service = textArray[0];
    const destination = textArray.slice(textArray.indexOf("to") + 1).join(" ");
    return {
      id: "bus_" + bus.id,
      callout: bus.callout,
      destination: destination,
      service: service
    };
  });

  ctx.body = { success: true, busses: busses };
});

/**
 * Returns the current weather.
 * Transforms the data from the external API into a consistent data set.
 */
api.get("/weather", async ctx => {
  const response = await axios.get(endpoints.weather);
  const json = response.data;
  const content = json.data.weather.content;

  const weather = {
    summary: content.currentConditions.summary,
    temperature: Math.round(content.currentConditions.temperature),
    icon: content.currentConditions.icon,
    precip: content.items.length > 0 ? content.items[0].precipProbability : null
  };

  ctx.body = { success: true, weather: weather };
});

/**
 * Returns an array or images based on image group (e.g. marketing).
 */
api.get("/images/:group", async ctx => {
  const response = await axios.get(
    process.env.MEDIA_URL + "/describe/" + ctx.params.group.toLowerCase()
  );
  let images = null;
  if (response.data.success) {
    const baseURL = process.env.MEDIA_URL + response.data.path;
    images = response.data.files.map((file, index) => ({
      id: "img_" + index,
      url: baseURL + encodeURIComponent(file)
    }));
  }

  ctx.body = { success: true, images: images };
});

/**
 * Fetches the studio messages.
 */
api.get("/messages", async ctx => {
  const response = await axios.get(endpoints.messages, {
    params: { key: process.env.RAW_API_KEY }
  });

  const content = response.data;

  const messages = content.map(message => {
    let origin = "";

    const senderChars = message.sender.split("");
    const indexOfOriginStart = senderChars.indexOf("<");

    const originLong = senderChars
      .slice(indexOfOriginStart)
      .join("")
      .trim();

    const sender = senderChars
      .slice(0, indexOfOriginStart)
      .join("")
      .trim();

    if (originLong === "<website>") origin = "web";
    if (originLong === "<notify@twitter.com>") origin = "twt";

    return {
      id: "msg_" + message.id,
      origin: origin,
      sender: sender,
      subject: message.subject,
      body: message.body,
      datetime: message.datetime
    };
  });

  ctx.body = { success: true, messages: messages };
});

/**
 * Gets the last played tracks.
 */
api.get("/lastplayed", async ctx => {
  const response = await axios.get(endpoints.lastplayed, {
    params: { key: process.env.RAW_API_KEY }
  });

  const content = response.data;

  const lastplayed = content.map(logRow => {
    return {
      id: "lp_" + logRow.id,
      time: logRow.datetime,
      title: logRow.title,
      artist: logRow.artist,
      imageURL:
        "https://media.radio.warwick.ac.uk/lastfm/" +
        encodeURIComponent(logRow.artist) +
        ".jpg"
    };
  });

  ctx.body = { success: true, lastplayed: lastplayed };
});

/**
 * Gets the schedule of programming.
 */
api.get("/schedule", async ctx => {
  /*const response = await axios.get(endpoints.schedule, {
    params: { key: process.env.RAW_API_KEY }
  })
  const json = response.data;*/

  const schedule = [
    {
      id: 1,
      show_id: 5010,
      start: 1554404400,
      end: 1554408000,
      title: "Psychademics"
    },
    {
      id: 0,
      show_id: 5163,
      start: 1554408000,
      end: 1554411600,
      title: "ReggaetÓN"
    }
  ];

  ctx.body = { success: true, schedule: schedule };
});

/**
 * Gets the equipment bookings.
 */
api.get("/equipment", async ctx => {
  /*const response = await axios.get(endpoints.equipment, {
    params: { key: process.env.RAW_API_KEY }
  })
  const json = response.data;*/

  const equipment = [
    {
      id: 1,
      location: "Studio 2",
      location_code: "ST2",
      member: "Oliver Moon",
      start: 1554361200,
      end: 1554364800
    },
    {
      id: 0,
      location: "Studio 2",
      location_code: "ST2",
      member: "Ed Farrar",
      start: 1554364800,
      end: 1554368400
    }
  ];

  ctx.body = { success: true, equipment: equipment };
});

module.exports = api;
