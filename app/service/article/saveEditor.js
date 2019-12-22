let fs = require("fs");

module.exports = ctx => new Promise((resolve, reject) => {
    let _data = "";
    try {
        ctx.req.on("data", data => {
            _data += data;
        });
        ctx.req.addListener("end", function() {
            // 把我们在全局定义的postdata传递给parseQueryStr，进行格式的转化
            let parseData = parseQueryStr(_data);
            const { key, title, content, tag, createTime } = parseData;
            const data = fs.readFileSync("publish.json");
            let dataJson = JSON.parse(data.toString());
            const { drafts } = dataJson;
			const newObj = {
				key,
				title,
				createTime,
				tag,
				content,
			}
			editor(key ,drafts, newObj)

			const dataString = JSON.stringify(dataJson);
				fs.writeFile("publish.json", dataString, (err, data) => {
				if (err) console.log(err);
				ctx.body = {
					success: true,
				};
				resolve();
			});

        });
    } catch (error) {
        console.log(error);
    };

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

    function editor(id ,arr, newObj){
        arr.map((v, i) => {
            if (Object.keys(v)[0] == id) {
				v[id]=newObj
                return;
            }
        });
    };
});
