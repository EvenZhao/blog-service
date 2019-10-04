const wrapRes = require('../../utils/wrapResponse');

module.exports = (ctx) => new Promise((resolve, reject) => {
	const { pageSize, pageNo } = ctx.query;
	const list = [{
		title: '123',
		modifyTime: '2019-02-04 12:34:43',
		id: 1,
		tag: ['react'],
	}, {
		title: '123',
		modifyTime: '2019-02-04 12:34:43',
		id: 1,
		tag: ['react'],
	}, {
		title: '123',
		modifyTime: '2019-02-04 12:34:43',
		id: 1,
		tag: ['react'],
	}, {
		title: '123',
		modifyTime: '2019-02-04 12:34:43',
		id: 1,
		tag: ['react'],
	}, {
		title: '123',
		modifyTime: '2019-02-04 12:34:43',
		id: 1,
		tag: ['react'],
	},
	];
	const index = pageSize * (pageNo - 1);
	const newList = list.slice(index, index + pageSize);
	// ctx.body = wrapRes.wrapSuccess({
	// 	list: newList,
	// 	total: 20,
	// });
	resolve({
		list: newList,
		total: 20,
	});
});
