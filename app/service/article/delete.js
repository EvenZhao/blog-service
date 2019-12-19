let fs = require("fs");

module.exports = ctx =>
	new Promise((resolve, reject) => {
    	let _data = "";
		try {
			ctx.req.on("data", data => {
				_data += data;
			});
			ctx.req.addListener("end", function() {
				// 把我们在全局定义的postdata传递给parseQueryStr，进行格式的转化
				let parseData = parseQueryStr(_data);
				const { key } = parseData;
				const data = fs.readFileSync("publish.json");
				let dataJson = JSON.parse(data.toString());
				const { drafts } = dataJson;
				drafts.map((v, i) => {
					if (Object.keys(v)[0] == key) {
						drafts.splice(i, 1);
						return;
					}
				});
				const dataString = JSON.stringify(dataJson);
				fs.writeFile(
					"publish.json",
					dataString,
					(err, data) => {
						if (err) console.log(err);
						ctx.body = {
							success: true,
							data: drafts
						};
						resolve();
					}
				);
			});
		} catch (error) {
			console.log(error);
		}

		function parseQueryStr(queryStr) {
			let queryData = {};
			let queryStrList = queryStr.split("&");
			// 利用了ES6提供的forOf，可以找找相关的看看
			for (let [index, queryStr] of queryStrList.entries()) {
				// 进行切割
				let itemList = queryStr.split("=");
				queryData = JSON.parse(itemList);
			}
			return queryData;
		};

})

