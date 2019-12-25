let fs = require('fs');
const path = require('path');
let myPath = path.join(__dirname, '../../datas/');

module.exports = (ctx) => new Promise((resolve, reject) => {
	let datas = '';
	try {
		ctx.req.on('data', (data) => {
			datas += data;
		});
		ctx.req.addListener("end", function () {
			// 把我们在全局定义的postdata传递给parseQueryStr，进行格式的转化
			let parseData = parseQueryStr(datas);
			const { key } = parseData;
			_getDetail(key);
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

	function _getDetail(key) {
		fs.readdir(myPath, function (err, files) {
			if (err) console.log(err);
			let resContent = [];
			files.map(v => {
				if (v == `${key}.txt`) {
					const content = fs.readFileSync(`${myPath}${v}`);
					const item = JSON.parse(content.toString());
					resContent.push(item);
					return;
				}
			});
			ctx.body = {
				success: true,
				data: resContent
			};
			resolve();
		});
	};
});

