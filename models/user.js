var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var commoditySchema = new Schema({
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
  }
}, {
  timestamps: true
});

var User = new Schema({
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      unique: true
    },
    onSale: [commoditySchema],
    purchased: [commoditySchema]
}, {
  timestamps: true,
  usePushEach: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);