
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const router = require('./app/router');

const app = new Koa();

app.listen(80, () => {
	console.log('listen at 80');
});

app.use(serve(
	path.join(__dirname, './views'),
));
app.use(router.routes());
app.use(router.allowedMethods());
