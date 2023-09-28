const userModel =require('../model/userModel');

const userController={
    login:async(req,res)=>{
        //解构前端用户登录发送过来的数据
        const {phoneNumber,password}=req.body;
        //根据手机号和密码查询数据库
        const result=await userModel.find({phoneNumber,password});
        console.log(result);
        if(result.length){
            res.send({
                code:200,
                msg:'登录成功'
            })
        }else{
            await userModel.create({phoneNumber,password});
            res.send({
                code:200,
                msg:'注册成功'
            })
        }
    },
    get:async(req,res)=>{
        const data=await userModel.find({});
        res.send({data});
    },
    del:async(req,res)=>{
        const {phone}=req.params;
        await userModel.deleteOne({phoneNumber:phone});
        res.send({
            code:200,
            msg:'删除成功'
        })
    }
}

module.exports = userController