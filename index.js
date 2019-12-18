
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const cors = require("koa2-cors");
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
app.use(
	cors({
		origin: function(ctx) {
			if (ctx.url === "/article") {
				return false;
			}
			return "*";
		},
		exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
		maxAge: 5,
		credentials: true,
		allowMethods: ["GET", "POST", "DELETE"],
		allowHeaders: ["Content-Type", "Authorization", "Accept"]
	})
);
