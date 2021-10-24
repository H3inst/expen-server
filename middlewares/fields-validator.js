const { validationResult } = require("express-validator");

function fieldsValidator(request, response, next) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.json({
      status: "error",
      errors: errors.mapped()
    });
  }

  next();
}

module.exports = fieldsValidator;