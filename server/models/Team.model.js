const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    name: String,
    history: String,
    imageUrl: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},
    {
        timestamps: true
    })

const teamModel = mongoose.model('Team', teamSchema)
module.exports = teamModel

