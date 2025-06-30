const Koa = require('koa');
const body = require('koa-body');
const router = require('./routes/routes');

const app = new Koa();

app.use(body());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
