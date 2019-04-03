const koa = require("koa");
const serve = require("koa-static");

const app = new koa();
const router = require("./router");

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

app.on("error", (err, ctx) => {
  console.log(err.message);
});

app.use(router.routes());

module.exports = app;
