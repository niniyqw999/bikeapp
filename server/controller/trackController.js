const trackModel = require('../model/trackModel');

const trackController = {
    add: async (req, res) => {
        const {tracks,phoneNumber} = req.body
        console.log(tracks)
        await trackModel.insertMany({ phoneNumber,tracks, time: new Date() })
        res.send({
            code: 200,
            msg: "保存成功"
        })
    },
    get: async (req, res) => {
        const { phoneNumber,id } = req.query
        if (id) {
            //获取单个数据
            const data = await trackModel.find({ _id: id})
            res.send({
                code: 200,
                data
            })
            console.log('单个数据')
        } else {
            // 获取所有数据
            const data = await trackModel.find({phoneNumber});
            res.send({
                code: 200,
                data
            })
            console.log('所有数据')
        }
    },
    del: async (req, res) => {
        const {id} = req.params
        console.log(id)
        await trackModel.deleteOne({ _id: id })
        res.send({
            code: 200,
            msg: "删除成功"
        })
    }
}


module.exports = trackController