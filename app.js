// 导入koa模块
const Koa = require('koa');
// 创建koa的实例app
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');

const checkToken = require('./utils/checkToken')
require('./utils/colors');
const router = require('./router/index')
const {
	connectDb
} = require('./db/index')
// 连接数据库
;(async () =>{
	await connectDb()
})()


app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024
  }
}));

app.use(bodyParser());


// logger
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`.prompt);
});


// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});
// 验证token
app.use(checkToken)

app.use(router.routes()).use(router.allowedMethods());
// 监听端口
app.listen(3000, () => {
	console.log("服务器已启动，http://localhost:3000");
})
