const mongoose = require('mongoose')
const Schema = mongoose.Schema

//设置数据库轨迹表
const trackType = {
    phoneNumber: String,
    tracks: [
        {
            latitude: Number,
            longitude: Number,
            _id: false
        }
    ],
    time: Date
}

const trackModel = mongoose.model('track', new Schema(trackType))

module.exports = trackModel