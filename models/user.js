var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var commoditySchema = new Schema({
  seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  itemname: {
      type: String,
      required: true
  },
  category: [{
      type: String,
      required: true
  }],
  price: {
      type: Currency,
      required: true,
      min: 0,
      default: 0
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  usePushEach: true
});

var User = new Schema({
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      unique: true,
      required:true,
      trim:true
    },
    createdCourses: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course' 
    }],
    boughtCourses: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course' 
    }],
    problems: [{
        problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
        code: String,
        status: Number  // 1 -- solved, -1 -- not correct (compiled but didnt ran)   0 -- not attempted
    }],
    onSale: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commodity'
    }],
    purchased: [commoditySchema]
}, {
  timestamps: true,
  usePushEach: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);