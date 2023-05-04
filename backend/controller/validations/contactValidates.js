const joi = require('joi');

const addValidate = (data) => {
    const schema = joi.object({
        fullName: joi.string().required(),
        phone: joi.string().required(),
        email: joi.string().required(),
        date: joi.date().default(Date.now())
    })
    return schema.validate(data);
}


module.exports = { addValidate };