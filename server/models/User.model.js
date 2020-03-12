const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    history: String,
    position: String,
    imageUrl: String,
    data: {
        kills: Number,
        deaths: Number,
        assists: Number,
    }
},
    {
        timestamps: true
    })

const userModel = mongoose.model('User', userSchema)
module.exports = userModel