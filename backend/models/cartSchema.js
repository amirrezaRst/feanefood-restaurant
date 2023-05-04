const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: { type: String, require: true },
    count: { type: Number, require: true },
    price: { type: Number, require: true },
    pic: { type: String, require: true }
})


module.exports = cartSchema;