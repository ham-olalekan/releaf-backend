const Joi = require("joi");

const validate = (params) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(250).required(),
    lastName: Joi.string().min(2).max(250).required(),
    gender: Joi.string().required(),
  });
  return schema.validate(params);
};

exports.validate = validate;
