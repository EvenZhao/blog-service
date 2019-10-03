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
	console.log(newList, index, pageSize, pageNo);
	ctx.body = {
		success: true,
		value: {
			list: newList,
			total: 20,
		},
	};
	resolve();
});
