const koaRouter = require("koa-router");
const axios = require("axios");
const fs = require("fs-extra");

const api = new koaRouter();

const endpoints = {
  weather: "https://my.warwick.ac.uk/api/tiles/content/weather",
  bus: "https://my.warwick.ac.uk/api/tiles/content/bus",
  messages: "",
  lastplayed: "",
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

  const buses = json.data.bus.content.items.map(bus => {
    const textArray = bus.text.split(" ");
    const busService = textArray[0];
    const destination = textArray.slice(textArray.indexOf("to") + 1).join(" ");
    return {
      id: bus.id,
      callout: bus.callout,
      destination: destination,
      bus_service: busService
    };
  });

  ctx.body = { success: true, buses: buses };
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
    temperature: content.currentConditions.temperature,
    icon: content.currentConditions.icon,
    precip: content.items.length > 0 ? content.items[0].precipProbability : null
  };

  ctx.body = { success: true, weather: weather };
});

api.get("/images", async ctx => {
  const files = await fs.readdir("./resources/media/images/");
  const images = files.map(file => "/media/images/" + encodeURIComponent(file));

  ctx.body = { success: true, images: images };
});

api.get("/messages", async ctx => {
  /*const response = await axios.get(endpoints.messages, {
    params: { key: process.env.RAW_API_KEY }
  });
  const json = response.data;*/

  const messages = [
    {
      id: 1,
      sender: "Will Hall",
      origin: "Twitter",
      origin_code: "twt",
      body: "Test Message. Hey this is a message."
    },
    {
      id: 0,
      sender: "Larry Brosman",
      origin: "Website",
      origin_code: "web",
      body: "This message is from a web user."
    }
  ];

  ctx.body = { success: true, messages: messages };
});

api.get("/lastplayed", async ctx => {
  /*const response = await axios.get(endpoints.lastplayed, {
    params: { key: process.env.RAW_API_KEY }
  })
  const json = response.data;*/

  const lastplayed = [
    {
      id: 1,
      time: 1554370299,
      title: "Borderline",
      artist: "Tame Impala",
      imageURL: "https://i.ytimg.com/vi/hNJOI2dtDZ4/maxresdefault.jpg"
    },
    {
      id: 0,
      time: 1554370237,
      title: "Patience",
      artist: "Tame Impala",
      imageURL:
        "http://www.brooklynvegan.com/files/2019/03/tame-impala-patience.jpg"
    }
  ];

  ctx.body = { success: true, lastplayed: lastplayed };
});

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
