

const mongoose = require('mongoose')
const connectDb = () => {
	return new Promise((resolve, reject) => {
		mongoose.connect('mongodb://localhost:27017/weibo',{ useNewUrlParser: true,useUnifiedTopology: true })
		const conn = mongoose.connection
		conn.on("connected",() => {
		    console.log("数据库连接成功")
			resolve()
		})
		conn.on('error', (error) => {
			console.log("数据库连接失败")
			reject(error)
		});
	}) 
}
exports.connectDb = connectDb
