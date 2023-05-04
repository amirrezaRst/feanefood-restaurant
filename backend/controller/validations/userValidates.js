const joi = require('joi');


const registerValidate = (data) => {
    const schema = joi.object({
        fullName: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        role: joi.string().default("user")
    })
    return schema.validate(data);
}

const loginValidate = (data) => {
    const schema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    })
    return schema.validate(data);
}

const editValidate = (data) => {
    const schema = joi.object({
        fullName: joi.string().required(),
        email: joi.string().required()
    })
    return schema.validate(data);
}


module.exports = { registerValidate, loginValidate,editValidate }