const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: { type: String, require: true },
    score: { type: String, require: true },
    text: { type: String, require: true },
    time: { type: Array }
})

module.exports.commentSchema = commentSchema