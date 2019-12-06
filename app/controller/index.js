const Router = require('koa-router');

const saveArtical = require("../service/article/saveArtical");
const getDetail = require('../service/article/getDetail');

const router = new Router({ prefix: '/api' });


router.get('/article/save', async (ctx, next) => {
	await saveArtical(ctx);
	await next();
});
router.get('/article/getDetail', async (ctx, next) => {
	await getDetail(ctx);
	await next();
});
// router.get('/general/pv', async (ctx, next) => {
// 	await handleGetStock(ctx);
// 	await next();
// });

module.exports = router;
