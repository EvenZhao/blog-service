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
            const { name, password } = parseData;
            console.log(name, password);
            if (name === 'even' && password === '990990') {
                ctx.response.redirect('/acticle/home');
                resolve();
            }
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
