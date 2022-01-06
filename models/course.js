const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const courseSchema = new mongoose.Schema({//to user middleware in mongoose
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    price: {
        type: Currency,
        required: true,
        min: 0,
        default: 0
    },
    description: String,
    image: {
        type: String,
    },
    category: [{
        type: String,
        required: true
    }],
    numberOfTimesBought: Number,
    rating: Number,  //give decimal type
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }]
},{
    timestamps:true,
    usePushEach: true
})

var Course = mongoose.model('Course',courseSchema)

module.exports = Course