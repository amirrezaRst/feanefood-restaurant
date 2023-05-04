const mongoose = require('mongoose');

const cartSchema = require('./cartSchema');

const userSchema = new mongoose.Schema({
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    cart: [cartSchema],
    role: { type: String, default: "user" }
})

const userModel = mongoose.model("users", userSchema);


module.exports = userModel