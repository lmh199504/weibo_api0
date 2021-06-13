const ossConfig = require('../../utils/ossConfig')
const OSS = require('ali-oss')


module.exports = async (ctx, next) => {

	const files = ctx.request.files
	// 文件路径
	var filePath = files.file.path;
	// 文件类型
	var temp = files.file.name.split('.');
	var fileType = temp[temp.length - 1];
	var lastName = '.' + fileType;
	// 构建图片名
	var fileName = Date.now() + lastName;
	const client = new OSS(ossConfig);
	var result = await client.put(`/weiboHeader/${fileName}`, filePath);
	ctx.body = {
		code: 0,
		data: {
			...result
		}
	}
}