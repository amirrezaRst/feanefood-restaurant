const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    answering: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() }
})

const contactModel = mongoose.model("contact", contactSchema);


module.exports = contactModel;