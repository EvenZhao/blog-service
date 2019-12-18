let fs = require("fs");

module.exports = ctx =>
	new Promise((resolve, reject) => {
		try {
			const data = fs.readFileSync("publish.json");
			let dataJson = JSON.parse(data.toString());
			const { drafts } = dataJson;
			ctx.body = {
				success: true,
				data: drafts
			};
			resolve();
		} catch (error) {
			console.log(error);
		}
	});
