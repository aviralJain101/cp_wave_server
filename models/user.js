const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({//to user middleware in mongoose
    _id: { //same as _id of UserAuth
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'UserAuth',
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    createdCourses: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Course' }],
    boughtCourses: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Course' }],
    problems: [{
        problemId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Problem' },
        code: String,
        status: Number  // 1 -- solved, -1 -- not correct (compiled but didnt ran)   0 -- not attempted
    }]
},{
    _id: false,
    timestamps:true
})




const User = mongoose.model('User',userSchema)

module.exports = User