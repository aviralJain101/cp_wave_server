const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({//to user middleware in mongoose
    title: String, 
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    rating: Number,  //give decimal type
    price: Number, //give decimal type
    numberOfTimesBought: Number,
    topics: [mongoose.SchemaTypes.ObjectId]
},{
    timestamps:true
})



const Course = mongoose.model('Course',courseSchema)

module.exports = Course