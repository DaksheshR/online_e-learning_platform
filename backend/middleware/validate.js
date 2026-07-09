const Joi = require('joi');

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
}

function validateParams(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
}

module.exports = { validateBody, validateParams };
