const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({//to user middleware in mongoose
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'UserAuth',
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){//setting a custom validator
            if(value<0){
                throw Error('Age must be positive')
            }
        }
    },
    createdCourses: [mongoose.SchemaTypes.ObjectId],
    boughtCourses: [mongoose.SchemaTypes.ObjectId],
    problems: [{
        problemId: mongoose.SchemaTypes.ObjectId,
        code: String,
        status: Number  // 1 -- solved, -1 -- not correct (compiled but didnt ran)   0 -- not attempted
    }]
},{
    timestamps:true
})




const User = mongoose.model('User',userSchema)

module.exports = User