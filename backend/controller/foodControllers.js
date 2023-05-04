const mongoose = require('mongoose');

const foodModel = require('../models/foodModel');
const { addValidate, editValidate } = require('./validations/foodValidates');


//! Get Controllers
const foodList = async (req, res) => {
    const allFood = await foodModel.find()
    res.send(allFood)
}

const foodHomePage = async (req, res) => {
    const allFood = await foodModel.find().limit(6)
    res.send(allFood)
}

const singleFood = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")
    const targetFood = await foodModel.findById(req.params.id)
    if (!targetFood) return res.status(404).send("food not found")
    res.send(targetFood)
}

//! Post Controllers
const addFood = async (req, res) => {
    if (addValidate(req.body).error) return res.status(400).send(addValidate(req.body).error.message)

    const newFood = new foodModel({
        name: req.body.name,
        materials: req.body.materials,
        type: req.body.type,
        price: req.body.price,
        discount: req.body.discount,
        available: req.body.available,
        score: req.body.score,
        // pic: req.file.path
        pic: req.body.pic
    })
    console.log(`__________ running success __________`);
    await newFood.save()
    res.send(newFood)
}


//! Put Controllers
const editFood = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")
    const targetFood = await foodModel.findById(req.params.id)
    if (!targetFood) return res.status(404).send("food not found")


    if (editValidate(req.body).error) return res.status(400).send(editValidate(req.body).error.message)

    targetFood.name = req.body.name;
    targetFood.materials = req.body.materials;
    targetFood.type = req.body.type;
    targetFood.price = req.body.price;
    targetFood.discount = req.body.discount;
    targetFood.available = req.body.available;
    targetFood.score = req.body.score;

    await targetFood.save()
    res.send("food updated")
}

//! Delete Controllers
const deleteFood = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")
    const targetFood = await foodModel.findByIdAndRemove(req.params.id)
    if (!targetFood) return res.status(404).send("food not found")
    res.send("food deleted")
}



module.exports = { foodList, foodHomePage, singleFood, addFood, editFood, deleteFood };