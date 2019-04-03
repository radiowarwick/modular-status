const koaRouter = require("koa-router");
const axios = require("axios");
const fs = require("fs-extra");

const router = new koaRouter();

const endpoints = {
  weather: "https://my.warwick.ac.uk/api/tiles/content/weather",
  bus: "https://my.warwick.ac.uk/api/tiles/content/bus"
};

/**
 * Returns the next busses to depart.
 * Transforms the data from the external API into a consistent data set.
 */
router.get("/api/bus", async ctx => {
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
router.get("/api/weather", async ctx => {
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

router.get("/api/images/groups", async ctx => {
  const groups = await fs.readdir("./resources/images/");
  ctx.body = { success: true, groups: groups };
});

router.get("/api/images/groups/:id", async ctx => {
  const files = await fs.readdir("./resources/images/" + ctx.params.id);

  const images = files.map(
    file => "/images/" + ctx.params.id + "/" + encodeURIComponent(file)
  );

  ctx.body = { success: true, images: images };
});

module.exports = router;
