const joi = require('joi');

const addValidate = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        score: joi.number().required(),
        text: joi.string().required()
    })
    return schema.validate(data);
}

const editValidate = (data) => {
    const schema = joi.object({
        score: joi.number().required(),
        text: joi.string().required()
    });
    return schema.validate(data);
}


module.exports = { addValidate, editValidate };