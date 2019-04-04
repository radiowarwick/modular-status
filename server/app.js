const koa = require("koa");
const serve = require("koa-static");
const mount = require("koa-mount");

const app = new koa();
const api = require("./routes/api");

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { success: false, message: err.message };
    ctx.app.emit("error", err, ctx);
  }
});

app.use(serve("../build"));
app.use(serve("./resources"));
app.use(mount("/api", api.routes()));

app.on("error", (err, ctx) => {
  console.log(err.message);
});

module.exports = app;
