module.exports = (ctx) => new Promise((resolve, reject) => {
	const { id } = ctx.query;

	const dataSource = [
		{
			content: 'yyyyyysbbb',
			title: 'title',
			modifyTime: '2019-10-03 12:34:43',
			tag: ['react'],
			id: 1,
		}, {
			content: 'yyyyyysbbb',
			title: 'title',
			modifyTime: '2019-10-03 12:34:43',
			tag: ['react'],
			id: 2,
		},
	];
	const newData = dataSource.find((item) => item.id == id);
	ctx.body = {
		success: newData || false,
		value: newData,
		msg: newData ? undefined : 'not found',
	};
	resolve();
});
