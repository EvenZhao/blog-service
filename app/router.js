const Router = require('koa-router');
const article = require('./controller/article');

const router = new Router({ prefix: '/api' });
article(router);
module.exports = router;
