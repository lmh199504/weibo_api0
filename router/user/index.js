
// code 0 成功 code 1 失败

const login = require('./login')
const register = require('./register')
const testToken = require('./testToken')

module.exports = {
	login,
	register,
	testToken
}