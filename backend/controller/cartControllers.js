const joi = require('joi');
const mongoose = require('mongoose');

const userModel = require("../models/userModel")
const { addValidate, editValidate } = require('./validations/cartValidates');

//! Post Controllers
const addCart = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")
    const targetUser = await userModel.findById(req.params.id)
    if (!targetUser) return res.status(404).send("user not found!")


    if (addValidate(req.body).error) return res.status(400).send(addValidate(req.body).error.message)

    const foodIndex = targetUser.cart.findIndex(item => {
        return item.name == req.body.name
    })

    if (foodIndex == -1) {
        const newCart = {
            name: req.body.name,
            count: req.body.count,
            price: req.body.price,
            pic: req.body.pic
        }
        targetUser.cart.push(newCart)
    } else {
        targetUser.cart[foodIndex].count += req.body.count;
    }

    await targetUser.save()
    res.send("cart updated")
}



//! Put Controllers
const editCart = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")
    const targetUser = await userModel.findById(req.params.userId)
    if (!targetUser) return res.status(404).send("user not found")

    const foundCart = targetUser.cart.id(req.params.foodId)
    if (!foundCart) return res.status(404).send("cart not found")


    if (editValidate(req.body).error) return res.status(400).send(editValidate(req.body).error.message)

    foundCart.count = req.body.count

    const foodList = [];

    targetUser.cart.map(async item => {
        foodList.push(item.price * item.count);
    })

    var totalPrice = await foodList.reduce(function (a, b) { return a + b; }, 0)

    await targetUser.save()
    res.send(foodList)
}


//! Delete Controllers
const deleteCart = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")
    const targetUser = await userModel.findById(req.params.userId)
    if (!targetUser) return res.status(404).send("user not found")

    const foundCart = targetUser.cart.id(req.params.foodId)
    if (foundCart) foundCart.remove()
    else if (!targetUser.cart.id(req.params.foodId)) return res.status(404).send("cart not found")

    await targetUser.save()
    res.send("cart deleted")
}



module.exports = { addCart, editCart, deleteCart }