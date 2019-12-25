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
            const { status, key } = parseData;
            // 存在key,即找到该文件，进行修改。
                // 读取文件夹中文件的个数，用长度做可key,确保唯一性
                fs.readdir(myPath, function (err, files) {
                    if (err) console.log(err);
                    const _key = key + '.txt';
                    files.map(v => {
                        if (v == _key) {
                            const content = fs.readFileSync(`${myPath}${v}`);
                            const item = JSON.parse(content.toString());
                            item.status = status;
                            fs.writeFileSync(`${myPath}${_key}`, JSON.stringify(item));
                        }
                    });
                    ctx.body = {
                        success: true,
                    };
                    resolve();
                });
            })
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
