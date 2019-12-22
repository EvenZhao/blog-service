const Router = require('koa-router');

const saveArtical = require("../service/article/saveArtical");
const getDetail = require('../service/article/getDetail');
const getPublish = require('../service/article/getPublish');
const changeStatus = require("../service/article/changeStatus");
const deleteItem = require('../service/article/delete');

const getDrafts = require('../service/article/getDrafts');
const saveEditor = require('../service/article/saveEditor');
const router = new Router({ prefix: '/api' });


router.post('/article/save', async (ctx, next) => {
	await saveArtical(ctx);
	await next();
});
router.get('/article/getPublish', async (ctx, next) => {
	await getPublish(ctx);
	await next();
});
router.get("/article/getDrafts", async (ctx, next) => {
	await getDrafts(ctx);
	await next();
});
router.post("/article/changeStatus", async (ctx, next) => {
	await changeStatus(ctx);
	await next();
});
router.post("/article/delete", async (ctx, next) => {
	await deleteItem(ctx);
	await next();
});
router.post('/article/getDetail', async (ctx, next) => {
	await getDetail(ctx);
	await next();
});
router.post('/article/saveEditor', async (ctx, next) => {
	await saveEditor(ctx);
	await next();
});
// router.get('/general/pv', async (ctx, next) => {
// 	await handleGetStock(ctx);
// 	await next();
// });

module.exports = router;
