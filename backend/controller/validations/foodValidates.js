const joi = require('joi');

const addValidate = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        materials: joi.array().required(),
        type: joi.string().required(),
        price: joi.number().required(),
        discount: joi.number().default(0),
        available: joi.boolean().default(true),
        score: joi.number().default(0),
        pic: joi.string().required()
    })
    return schema.validate(data);
}

const editValidate = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        materials: joi.array().required(),
        type: joi.string().required(),
        price: joi.number().required(),
        discount: joi.number().required(),
        available: joi.boolean().required(),
        score: joi.number().required()
    })
    return schema.validate(data);
}


module.exports = { addValidate ,editValidate};