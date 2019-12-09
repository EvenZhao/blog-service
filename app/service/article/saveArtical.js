let fs = require('fs');

module.exports = (ctx) => new Promise((resolve, reject) => {
	const { title, tag, content, isPublish } = ctx.query;
	const data = fs.readFileSync('publish.json');
	let dataJson = JSON.parse(data.toString());
	const {publish, drafts} = dataJson;
	// 添加article isPublish===true,存入已发版中。否则存入草稿箱
	function addArticle(obj, title, tag, content) {
		const len = obj.length;
		const key = len + 1;
		const _obj = {};
		_obj[key] = {
			title: title,
			tag: tag,
			content: content,
			id: key
		};
		obj.push(_obj);
	}

	if (isPublish) {
		addArticle(publish, title, tag, content);
	} else {
		addArticle(drafts, title, tag, content);
	}

	const dataString = JSON.stringify(dataJson);

	fs.writeFile('publish.json', dataString, (err, data) => {
		if (err) console.log(err);
		ctx.body = {
			success: true
		};
		resolve();
	})
});
