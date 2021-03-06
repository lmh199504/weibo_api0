const Jwt = require('../../token/index.js')
const jwt = new Jwt()
const { UserModel } = require('../../db/models')
const { filter } = require('../../db/filter.js')
const { successCode, errorCode } = require('../code')
module.exports = async (ctx, next) => {
	let token = ctx.request.headers["authorization"]
	const request = jwt.verifyToken(token)
	const userInfo =  await UserModel.findOne({
		_id: request.user_id
	}, filter)
	console.log(userInfo)
	ctx.status = 200;
	if(userInfo) {
		ctx.body = {
			code: successCode,
			data: userInfo
		}
	} else {
		ctx.body = {
			code: errorCode,
			resMsg: '用户不存在。'
		}
	}
}