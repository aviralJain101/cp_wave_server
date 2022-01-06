const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({//to user middleware in mongoose
    title: String, 
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    imageUrl: String,
    description: String,
    rating: Number,  //give decimal type
    price: Number, //give decimal type
    numberOfTimesBought: Number,
    topics: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Topic'
    }],
    tags: [String]
},{
    timestamps:true
})



const Course = mongoose.model('Course',courseSchema)

module.exports = Course