const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Commodity = mongoose.model('Commodity', commoditySchema);

module.exports = Commodity;