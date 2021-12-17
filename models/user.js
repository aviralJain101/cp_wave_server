var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      unique: true
    },
    onSale: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commodity'
    }],
    bought: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commodity'
    }]
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);