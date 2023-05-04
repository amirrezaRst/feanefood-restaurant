const mongoose = require('mongoose');

const foodModel = require('../models/foodModel');
const { addValidate, editValidate } = require('./validations/commentValidate');

//! Post Controllers
const addComment = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")

    const targetFood = await foodModel.findById(req.params.id)
    if (!targetFood) return res.status(404).send("food not found")

    if (addValidate(req.body).error) return res.status(400).send(addValidate(req.body).error.message)

    const fullDate = new Date()

    const newComment = {
        name: req.body.name,
        score: req.body.score,
        text: req.body.text,
        time: [fullDate.getMonth() + 1, fullDate.getDate(), fullDate.getFullYear()]
    }
    targetFood.comments.push(newComment)

    await targetFood.save()
    res.send("comment added")
}

//! Put Controllers
const editComment = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")
    const targetFood = await foodModel.findById(req.params.foodId)
    if (!targetFood) return res.status(404).send("food not found")

    const foundComment = targetFood.comments.id(req.params.commentId)
    if (!foundComment) return res.status(404).send("comment not found")


    if (editValidate(req.body).error) return res.status(400).send(editValidate(req.body).error.message)

    foundComment.score = req.body.score;
    foundComment.text = req.body.text;
    await targetFood.save()
    res.send("comment updated")
}

//! Delete Controllers
const deleteComment = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")
    const targetFood = await foodModel.findById(req.params.foodId)
    if (!targetFood) return res.status(404).send("food not found")

    const foundComment = targetFood.comments.id(req.params.commentId)
    if (foundComment) foundComment.remove()
    else if (!targetFood.comments.id(req.params.commentId)) return res.status(404).send("comment not found")

    await targetFood.save()
    res.send("comment deleted")
}


module.exports = { addComment, editComment, deleteComment };