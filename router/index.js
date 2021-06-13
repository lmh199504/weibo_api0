// 导入koa-router模块
const Router = require('koa-router');
// 创建koa-router的实例router
const router = new Router();

const user =  require('./user/index')
const uploadImg = require('./upload/uploadimg')



// 登录接口
router.post('/user/login', user.login)
// 注册
router.post('/user/register', user.register)
// 上传文件
router.post('/uploadimg', uploadImg)
// 测试一下token
router.post('/testToken', user.testToken)


module.exports = router;