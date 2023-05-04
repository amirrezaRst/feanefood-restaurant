const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');
const winston = require('winston');
require("winston-mongodb");
require("express-async-errors");


const connectDB = require('./configs/db');



//! Config Env
dotEnv.config({ path: "./configs/config.env" });

//! Config Winston
winston.add(new winston.transports.MongoDB({
    db: "mongodb://localhost:27017/feaneFood",
}))


const app = express().use(express.json()).use(cors());


//! Connect DB
connectDB();


//! Static Folder
app.use(express.static("uploads"))





//! _____Admin Routes_____
app.use("/api/admin", require('./routes/adminRoutes'));



//! ___User Routes___
app.use(require('./routes/userRoutes'));


//! ___Payment Routes___
app.use("/api",require('./routes/paymentRoutes'));


//! ___Cart Routes___
app.use("/api", require('./routes/cartRoutes'));


//! ___Food Routes___
app.use("/api", require('./routes/foodRoutes'));


//! ___Comment Routes___
app.use("/api", require('./routes/commentRoutes'));


//! ___Contact Routes___
app.use("/api", require('./routes/contactRoutes'));


//!Handle Routes Error
app.use((err, req, res, next) => {
    console.log(err);
    winston.error(err, err);
    res.status(500).send("There is a problem on the server side")
})




const port = process.env.PORT || 3000;

app.listen(port, err => {
    if (err) console.log(err);
    else console.log(`Server Running On ${process.env.NODE_ENV} Mode In Port ${port}`);
})