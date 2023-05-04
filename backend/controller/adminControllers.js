const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');

const userModel = require('../models/userModel');
const { registerValidate, editValidate } = require('./validations/userValidates');



//! Get Controllers
const userList = async (req, res) => {
    const allUser = await userModel.find()
    res.send(allUser)
}

const singleUser = async (req, res) => {
    const targetUser = await userModel.findById(req.params.id)
    if (!targetUser) return res.status(404).send("user not found")
    res.send(targetUser)
}


//! Post Controllers
const addUser = async (req, res) => {
    if (registerValidate(req.body).error) return res.status(400).send(registerValidate(req.body).error.message);

    const newUser = new userModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
        role: req.body.role
    })
    await newUser.save()
    res.send(newUser)
}

const changePassword = async (req, res) => {
    const schema = joi.object({
        password: joi.string().required().trim()
    })
    if (schema.validate(req.body).error) return res.status(400).send(schema.validate(req.body).error.message);

    const targetUser = await userModel.findById(req.params.id);
    if (!targetUser) return res.status(404).send("user not found!")

    targetUser.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))

    await targetUser.save();
    res.send("Password Changed");
}



//! Put Controllers
const editUser = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")

    if (editValidate(req.body).error) return res.status(400).send(editValidate(req.body).error.message)

    const targetUser = await userModel.findById(req.params.id)
    if (!targetUser) return res.status(404).send("user not found")

    targetUser.fullName = req.body.fullName;
    targetUser.email = req.body.email;

    await targetUser.save()
    res.send(targetUser)
}


//! Delete Controllers
const deleteUser = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid")
    const targetUser = await userModel.findByIdAndRemove(req.params.id)
    if (!targetUser) return res.status(404).send("user not found")
    res.send("user deleted")
}



module.exports = { userList, singleUser, addUser, editUser, deleteUser, changePassword };