const mongoose = require('mongoose');

const contactModel = require('../models/contactModel');
const { addValidate } = require('./validations/contactValidates');


//! Get Controllers
const contactList = async (req, res) => {
    const allContact = await contactModel.find()
    res.send(allContact);
};

//! Post Controllers
const addContact = async (req, res) => {

    if (addValidate(req.body).error) return res.status(400).send(addValidate(req.body).error.message);

    const newContact = new contactModel({
        fullName: req.body.fullName,
        phone: req.body.phone,
        email: req.body.email
    });
    newContact.save();
    res.send(newContact)
}

//! Delete Controllers
const deleteContact = async (req, res) => {
    if (!mongoose.isValidObjectId) return res.status(400).send("id is not valid");

    const contact = await contactModel.findByIdAndRemove(req.params.id);
    if (!contact) return res.status(404).send("contact not found");
    res.send("contact delete!");
}


module.exports = { contactList, addContact, deleteContact }