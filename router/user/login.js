

module.exports = async (ctx, next) => {
	ctx.status = 200
	ctx.body = {
		code: 0,
		data: {
			name:132132,
			password: 12123132
		}
	}
}