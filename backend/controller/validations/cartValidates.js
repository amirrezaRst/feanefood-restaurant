const joi = require('joi');


const addValidate = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        count: joi.number().required(),
        price: joi.number().required(),
        pic: joi.string().required()
    })
    return schema.validate(data);
}

const editValidate = (data) => {
    const schema = joi.object({
        count: joi.number().required(),
    })
    return schema.validate(data);
}


module.exports = { addValidate, editValidate };