const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    img:{
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

var Images = mongoose.model('Images', imageSchema);

module.exports = Images;