const mongoose = require('mongoose')


const topicSchema = new mongoose.Schema({//to user middleware in mongoose
    title: String, 
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    theory: String,
    problems: [mongoose.SchemaTypes.ObjectId]
},{
    timestamps:true
})



const Topic = mongoose.model('Topic',topicSchema)

module.exports = Topic