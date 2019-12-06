let fs = require('fs');

module.exports = (ctx) => new Promise((resolve, reject) => {
	const { title, tag, content } = ctx.query;
	const data = fs.readFileSync('publish.json');
	console.log(JSON.parse(data.toString()).employees);
	ctx.body = {
		success: true,
		// value: {
		// 	list: newList,
		// 	total: 20,
		// },
	};
	resolve();
});
