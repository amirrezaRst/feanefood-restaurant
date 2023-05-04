const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ZarinpalCheckout = require('zarinpal-checkout');

const userModel = require('../models/userModel');
const paymentModel = require('../models/paymentModel');
const { registerValidate, loginValidate, editValidate } = require('./validations/userValidates');



const zarinpal = ZarinpalCheckout.create('00000000-0000-0000-0000-000000000000', true);


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

const userEmail = async (req, res) => {
    const targetUser = await userModel.findOne({ email: req.params.email })
    if (!targetUser) return res.status(404).send("user not found")
    res.send(targetUser)
}


//! Post Controllers
const register = async (req, res) => {
    if (registerValidate(req.body).error) return res.status(400).send(registerValidate(req.body).error.message);

    const newUser = new userModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
        role: req.body.role
    })
    await newUser.save()
    const tokenData = {
        fullName: newUser.fullName,
        email: req.body.email,
        role: req.body.role
    }
    const token = jwt.sign(tokenData, "userToken")
    res.header("x-auth-token", token).send(newUser)
}

const login = async (req, res) => {
    if (loginValidate(req.body).error) return res.status(400).send(loginValidate(req.body).error.message)

    const findUser = await userModel.findOne({ email: req.body.email })
    if (!findUser) return res.status(400).send("Email or password is not valid")

    const passwordValidate = await bcrypt.compare(req.body.password, findUser.password)
    if (!passwordValidate) return res.status(400).send("Email or password is not valid")

    const tokenData = {
        _id: findUser._id,
        fullName: findUser.fullName,
        email: findUser.email,
        role: findUser.role
    }
    const token = jwt.sign(tokenData, "userToken")
    res.header("Access-Control-Expose-headers", "x-auth-token").header("x-auth-token", token).send(`welcome ${findUser.fullName}`)
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



//! Zarinpal Controllers
const checkoutCart = async (req, res) => {
    const user = await userModel.findById(req.user._id);
    const cart = user.cart;
    const address = req.params.address

    const amount = user.cart.reduce((acc, item) => {
        return acc + (item.price * item.count);
    }, 0)

    const payment = new paymentModel({
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            address
        },
        cart,
        amount
    });
    const response = await zarinpal.PaymentRequest({
        Amount: amount * 42000, // In Tomans
        CallbackURL: 'http://localhost:3001/verifyPayment',
        Description: `پرداخت به فین فود`,
        Email: user.email,
    });
    payment.paymentCode = response.authority;
    await payment.save();
    res.send(response)
}


const verifyPayment = async (req, res) => {
    const paymentCode = req.params.authority;
    const status = req.params.status;
    const payment = await paymentModel.findOne({ paymentCode });

    const user = await userModel.findOne({ email: payment.user.email });

    if (status === "OK") {
        
        const response = await zarinpal.PaymentVerification({
            Amount: payment.amount * 42000,
            Authority: paymentCode,
        });
        if (response.status === -21) {
            res.status(404).send('Empty!');
        } else {
            payment.refId = response.RefID;
            payment.success = true;
            user.cart = [];
            await user.save();
            await payment.save()
            res.send(response);
        }

    } else return res.send("پرداخت ناموفق")
}

const userPaymentInfo = async (req, res) => {
    const userPayment = await paymentModel.findOne({ authority: req.params.authority });
    if (!userPayment) return res.status(404).send("payment not found!");

    res.send(userPayment);
}


module.exports = { userList, singleUser, userEmail, register, login, editUser, deleteUser, checkoutCart, verifyPayment, userPaymentInfo }