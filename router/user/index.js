
// code 0 成功 code 1 失败

const login = require('./login')
const register = require('./register')
const testToken = require('./testToken')
const userInfo = require('./userInfo')
module.exports = {
	login,
	register,
	testToken,
	userInfo
}