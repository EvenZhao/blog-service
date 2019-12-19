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
            const { key, status } = parseData;
            const data = fs.readFileSync("publish.json");
            let dataJson = JSON.parse(data.toString());
            const { publish, drafts } = dataJson;

            if (status) {
                changeStatus(key, publish, drafts);
                res(publish);
            } else {
                changeStatus(key, drafts, publish);
                res(drafts);
            }

            function res(obj) {
                const dataString = JSON.stringify(dataJson);
                 fs.writeFile("publish.json", dataString, (err, data) => {
                    if (err) console.log(err);
                    ctx.body = {
                        success: true,
                        data: obj
                    };
                    resolve();
                });
            };

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

    function changeStatus(id,arr1,arr2){
        arr1.map((v, i) => {
            if (Object.keys(v)[0] == id) {
                const data = arr1.splice(i,1);
                console.log(data);
                const { key } = Object.values(data[0])[0];
                console.log(key);
                let obj = {};
                obj[key] = Object.values(v)[0];
                arr2.push(obj);
                return;
            }
        });
        console.log(arr1)
    };
});
