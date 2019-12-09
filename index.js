
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const router = require('./app/controller/index');

const app = new Koa();

app.listen(8000, () => {
	console.log('listen at 8000');
});

app.use(serve(
	path.join(__dirname, './views'),
));
app.use(router.routes());
app.use(router.allowedMethods());
