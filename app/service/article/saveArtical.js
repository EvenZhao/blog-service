let fs = require('fs');
const path = require('path');
let myPath = path.join(__dirname, '../../datas/');

module.exports = (ctx) => new Promise((resolve, reject) => {
	let _data = '';
	try {
		ctx.req.on('data', (data) => {
			_data += data;
		});
		ctx.req.addListener("end", function () {
			// 把我们在全局定义的postdata传递给parseQueryStr，进行格式的转化
			let parseData = parseQueryStr(_data);
			let parseObj = {};
			parseObj.title = parseData.title;
			parseObj.tag = parseData.tag;
			parseObj.content = parseData.content;
			parseObj.createTime = parseData.createTime;
			parseObj.status = parseData.status;
			// 存在key,即找到该文件，进行修改。
			if (parseData.key) {
				parseObj.key = parseData.key;
				// 读取文件夹中文件的个数，用长度做可key,确保唯一性
				fs.readdir(myPath, function (err, files) {
					if (err) console.log(err);
					const _key = parseData.key + '.txt';
					files.map(v => {
						if (v == _key) {
							fs.writeFileSync(`${myPath}${_key}`, JSON.stringify(parseObj));
						}
					});
					ctx.body = {
						success: true,
					};
					resolve();
				});
			} else {
				fs.readdir(myPath, function (err, files) {
					if (err) console.log(err);
					let key;
					if (files) {
						key = files.length + 1;
					} else {
						key = 1;
					}
					parseObj.key = key;
					console.log(parseObj);
					fs.writeFile(`${myPath}${key}.txt`, JSON.stringify(parseObj), (err, data) => {
						if (err) console.log(err);
						ctx.body = {
							success: true
						};
						resolve();
					});
				});
			}
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
});
