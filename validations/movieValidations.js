const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            movieName: Joi.string().required(),
            personalRating: Joi.number().required().min(0).max(10)
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            movieName: Joi.string(),
            personalRating: Joi.number().min(0).max(10)
        }

        return Joi.validate(request, updateSchema)
    },
}