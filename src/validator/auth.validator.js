const { check, validationResult } = require("express-validator");

module.exports.validateSignUpRequest = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Email is required"),
  check("password").isLength({ min: 6 }).withMessage("Password is required"),
];

module.exports.validateSignInRequest = [
  check("email").isEmail().withMessage("Email is required"),
  check("password").isLength({ min: 6 }).withMessage("Password is required"),
];

module.exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  next();
};
