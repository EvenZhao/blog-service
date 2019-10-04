const monk = require('monk');

const db = monk('localhost:27017/blog');
const article = db.get('article');


module.exports = (ctx) => new Promise(async (resolve, reject) => {
	const { id } = ctx.query;
	let docs = null;
	try {
		docs = await article.find({});
	} catch (err) {
		reject(err);
		return;
	}
	const newData = docs.find((item) => item.id == id);
	if (newData) {
		resolve(newData);
		return;
	}
	reject('not found');

});
