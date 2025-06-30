const koa = require('koa');
const koaBody = require('koa-body');
const routes = require('./routes/routes.js');

const app =  new koa();
app.use(koaBody({}));
app.use(routes.routes());
app.use(routes.allowedMethods());

module.exports = app;