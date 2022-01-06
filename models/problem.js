const mongoose = require('mongoose')


const problemSchema = new mongoose.Schema({//to user middleware in mongoose
    title: String, 
    difficulty: String,
    timeLimit: String,
    memoryLimit: String,
    input: String,
    output: String,
    statement: {
        text: [String],
        inputSpec: [String],
        outputSpec: [String],
        sampleTests: [
          {
            input: String,
            output: String,
          },
        ],
        notes: [String],
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    link: String,
    availableLanguages: [String],
    solutions: [{
        code: String,
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        language: String
    }]
},{
    timestamps:true
})



const Problem = mongoose.model('Problem',problemSchema)

module.exports = Problem