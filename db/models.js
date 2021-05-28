
const mongoose = require('mongoose')


// 用户数据表
const userSchema = mongoose.Schema({
    username:{type:String,isRequired:true,unique: true},
    password:{type:String,isRequired: true},
    headerImg:{type:String,default:'https://reactlmh.oss-cn-beijing.aliyuncs.com/heaher/23073179092.jpg'}
})
const UserModel = mongoose.model('user',userSchema)
exports.UserModel = UserModel
// 用户数据表end