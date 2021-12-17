const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var commoditySchema = new Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0,
        default: 0
    },
    img:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
}, {
    timestamps: true
});

var Commodity = mongoose.model('Commodity', commoditySchema);

module.exports = Commodity;