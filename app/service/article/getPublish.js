let fs = require('fs');

module.exports = (ctx) => new Promise((resolve, reject) => {
    try {
        const data = fs.readFileSync('publish.json');
        let dataJson = JSON.parse(data.toString());
        const { publish } = dataJson;
        ctx.body = {
            success: true,
            data: publish
        };
        resolve();
    } catch (error) {
        console.log(error)
    }
});
