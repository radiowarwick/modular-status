const koa = require("koa");
const serve = require("koa-static");
const mount = require("koa-mount");

const app = new koa();
const api = require("./routes/api");

/**
 * Capture all errors with a overwrapping middleware.
 *
 * Try each step, fail with 500 if required.
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { success: false, message: err.message };
    ctx.app.emit("error", err, ctx);
  }
});

/**
 * Serve the actual react app from the build folder.
 */
app.use(serve("../build"));

/**
 * Mount all API routes to the /api base route.
 */
app.use(mount("/api", api.routes()));

/**
 * Log errors.
 */
app.on("error", (err, ctx) => {
  console.log(err.message);
});

/**
 * Export app.
 */
module.exports = app;
