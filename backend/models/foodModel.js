const mongoose = require('mongoose');

const commentSchema = require('./commentSchema');

const foodSchema = new mongoose.Schema({
    name: { type: String, require: true },
    materials: [String],
    type: { type: String, require: true },
    price: { type: Number, require: true },
    discount: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    score: { type: Number, default: 0 },
    pic: { type: String, require: true },
    comments: [commentSchema]
})

const foodModel = mongoose.model("foods", foodSchema);


module.exports = foodModel;