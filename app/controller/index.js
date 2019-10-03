const Router = require('koa-router');

const getList = require('../service/article/getList');
const getDetail = require('../service/article/getDetail');

const router = new Router({ prefix: '/api' });


router.get('/article/getList', async (ctx, next) => {
	await getList(ctx);
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
