const mongoose = require('mongoose')


const problemSchema = new mongoose.Schema({//to user middleware in mongoose
    title: String, 
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    link: String,
    availableLanguages: [String],
    difficultyRating: Number,  //give decimal type
    testCases: [{
        testCase: String,
        correctAnswer: String,
    }],
    solutions: [{
        code: String,
        userId: mongoose.SchemaTypes.ObjectId,
        language: String
    }]
},{
    timestamps:true
})



const Problem = mongoose.model('Problem',problemSchema)

module.exports = Problem