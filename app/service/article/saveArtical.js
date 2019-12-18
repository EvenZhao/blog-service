let fs = require('fs');

module.exports = (ctx) => new Promise((resolve, reject) => {
	let _data = '';
	try {
		ctx.req.on('data', (data) => {
			_data += data;
		});
		ctx.req.addListener("end", function () {
			// 把我们在全局定义的postdata传递给parseQueryStr，进行格式的转化
			let parseData = parseQueryStr(_data);
			// 把成功后的parseData传出去
			// resolve(parseData);
			console.log(parseData);
			const { title, tag, content, isPublish, createTime } = parseData;
			const data = fs.readFileSync('publish.json');
			let dataJson = JSON.parse(data.toString());
			const { publish, drafts, length } = dataJson;
			console.log(length);
			if (isPublish) {
				addArticle(publish, title, tag, content, createTime, length);
			} else {
				addArticle(drafts, title, tag, content, createTime, length);
			};
			dataJson.length += 1;
			const dataString = JSON.stringify(dataJson);

			fs.writeFile('publish.json', dataString, (err, data) => {
				if (err) console.log(err);
				ctx.body = {
					success: true
				};
				resolve();
			});
		});
	} catch (error) {
		console.log(error)
	}


	function parseQueryStr(queryStr) {
		let queryData = {};
		let queryStrList = queryStr.split('&');
		// 利用了ES6提供的forOf，可以找找相关的看看
		for (let [index, queryStr] of queryStrList.entries()) {
			// 进行切割
			let itemList = queryStr.split('=');
			queryData = JSON.parse(itemList);
		}
		return queryData;
	}

	// 添加article isPublish===true,存入已发版中。否则存入草稿箱
	function addArticle(obj, title, tag, content, createTime, length) {
		const len = obj.length;
		const key = length;
		const _obj = {};
		_obj[key] = {
			key: key,
			title: title,
			createTime: createTime,
			tag: tag,
			content: content
		};
		obj.push(_obj);

	}
});
