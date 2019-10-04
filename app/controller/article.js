const getList = require('../service/article/getList');
const getDetail = require('../service/article/getDetail');
const wrapRes = require('../utils/wrapResponse');


module.exports = (router) => {
	router.get('/article/getList', async (ctx, next) => {
		let data;
		try {
			data = await getList(ctx);
		} catch (err) {
			wrapRes.wrapFail(ctx, err);
			await next();
			return;
		}
		wrapRes.wrapSuccess(ctx, data);
		await next();
	});

	router.get('/article/getDetail', async (ctx, next) => {
		let data;
		try {
			data = await getDetail(ctx);
		} catch (err) {
			wrapRes.wrapFail(ctx, err);
			await next();
			return;
		}
		wrapRes.wrapSuccess(ctx, data);
		await next();
	});
};
