
const Jwt = require('../token/index.js')
const jwt = new Jwt()
const { tokenOut } = require('../router/code')

const whiteRoute = [
    '/user/login',
    '/user/register',
    '/uploadimg'
]


module.exports = async (ctx,next) => {
    const url = ctx.request.url

    if(whiteRoute.includes(url)) {
        await next()
    } else {
        let token = ctx.request.headers["authorization"]
        const request = jwt.verifyToken(token)
        if(request == 'err') {
            ctx.status = 200;
            ctx.body = {
                code: tokenOut,
                resMsg: 'token已过期请重新登录。'
            }
        } else {
            console.log(request) // 
			jwt.refreshToken()
            await next();
        }
    }
}