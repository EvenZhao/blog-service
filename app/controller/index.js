const Router = require('koa-router');

const saveArtical = require("../service/article/saveArtical");
// const getDetail = require('../service/article/getDetail');
const getList = require('../service/article/getList');
// const changeStatus = require("../service/article/changeStatus");
// const deleteItem = require('../service/article/delete');

// const getDrafts = require('../service/article/getDrafts');
// const saveEditor = require('../service/article/saveEditor');
const router = new Router({ prefix: '/api' });

/* 备注：
status: 0删除，1publish, 2drafts..
1.获取列表，接口 article/getList，参数status（1.上架，2.草稿箱）
2.新建，接口 article/save，参数 title，tag, content, createTime,isPublish,status
3.保存，接口 article/save，参数 title，tag, content, createTime,isPublish,status,key
4.编辑，接口 article/getDetail，参数 key
5.删除，接口 article/changeStatus，参数 key status:0
6.上架下架，接口 article/changeStatus，参数 key status 上架：1，下架：2 */


router.post('/article/save', async (ctx, next) => {
	await saveArtical(ctx);
	await next();
});
router.post('/article/getList', async (ctx, next) => {
	await getList(ctx);
	await next();
});
// router.get("/article/getDrafts", async (ctx, next) => {
// 	await getDrafts(ctx);
// 	await next();
// });
// router.post("/article/changeStatus", async (ctx, next) => {
// 	await changeStatus(ctx);
// 	await next();
// });
// router.post("/article/delete", async (ctx, next) => {
// 	await deleteItem(ctx);
// 	await next();
// });
// router.post('/article/getDetail', async (ctx, next) => {
// 	await getDetail(ctx);
// 	await next();
// });
// router.post('/article/saveEditor', async (ctx, next) => {
// 	await saveEditor(ctx);
// 	await next();
// });
// router.get('/general/pv', async (ctx, next) => {
// 	await handleGetStock(ctx);
// 	await next();
// });

module.exports = router;
