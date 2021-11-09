
const { UserModel } = require('../../db/models')
const Jwt = require('../../token/index.js')
const jwt = new Jwt()
const md5 = require('blueimp-md5')
const { filter } = require('../../db/filter.js')
module.exports = async (ctx, next) => {
	const { password, username, header, repassword } = ctx.request.body
	if(!password) {
		ctx.status = 200 
		ctx.body = {
			code: 1,
			resMsg: '缺少密码'
		}
		return 
	}
	
	if(!username) {
		ctx.status = 200 
		ctx.body = {
			code: 1,
			resMsg: '请输入用户名'
		}
		return 
	}
	
	if(!header) {
		ctx.status = 200 
		ctx.body = {
			code: 1,
			resMsg: '请上传头像'
		}
		return 
	}
	
	if(repassword != password) {
		ctx.status = 200
		ctx.body = {
			code: 1,
			resMsg: '密码不一致'
		}
		return 
	}
	
	
	
 	
	const findResult = await UserModel.findOne({
		username
	})
	if(findResult) {
		ctx.status = 200
		ctx.body = {
			code: 1,
			resMsg: "用户名已经存在。"
		}
	} else {
		const saveData = await new UserModel({
			username,
			password: md5(password),
			headerImg: header
		}, filter).save()
		const token = jwt.generateToken({ user_id: saveData._id })
		delete saveData._doc.password
		ctx.status = 200
		ctx.body = {
			code: 0,
			data: {
				...saveData._doc,
				token,
			}
		}
	}
	
}