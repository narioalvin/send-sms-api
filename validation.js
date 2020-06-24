const Joi = require('@hapi/joi');

const messageValidation = (data) => {
  const schema = Joi.object({
    message: Joi.string().min(2).max(600).required(),
    number: Joi.number().min(10).required(),
  });
  return schema.validate(data);
};

module.exports.messageValidation = messageValidation;
