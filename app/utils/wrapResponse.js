module.exports = {
	wrapSuccess(ctx, value) {
		ctx.body = {
			success: true,
			value,
		};
	},
	wrapFail(ctx, msg) {
		ctx.body = {
			success: false,
			msg,
		};
	},
};
