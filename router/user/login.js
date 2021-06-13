

const Jwt = require('../../token/index.js')
const jwt = new Jwt()
const { successCode, errorCode } = require('../code')
const { UserModel } = require('../../db/models')
const md5 = require('blueimp-md5')
const { filter } = require('../../db/filter')
module.exports = async (ctx, next) => {
	const { username, password } = ctx.request.body
	if(!username || !password) {
		ctx.status = 200
		ctx.body = {
			code: errorCode,
			resMsg: '用户名或密码不能为空。'
		}
	}

	const userData = await UserModel.findOne({
		username,
		password: md5(password)
	}, filter)

	if(userData) {
		const token = jwt.generateToken({ user_id: userData._id })
		ctx.status = 200
		ctx.body = {
			code: successCode,
			data: {
				...userData._doc,
				token
			}
		}
	} else {

		ctx.status = 200
		ctx.body = {
			code: errorCode,
			resMsg: "用户名或密码不正确"
		}
	}


}