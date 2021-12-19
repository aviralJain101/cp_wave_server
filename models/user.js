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
      unique: true
    },
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