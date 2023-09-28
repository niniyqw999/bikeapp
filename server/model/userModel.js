const mongoose=require('mongoose')
const Schema=mongoose.Schema

//设置数据库用户表
const userType={
    phoneNumber:String,
    password:String,
}

const userModel= mongoose.model('user',new Schema(userType))

module.exports=userModel