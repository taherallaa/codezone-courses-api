const { body } = require("express-validator");

const validate = () => {
  return [
    body("username").notEmpty().withMessage("Pleas, Enter username"),
    body("email")
      .notEmpty()
      .withMessage("Pleas, Enter Email")
      .isEmail()
      .withMessage("Please, Enter Valid Email"),

    body("password").notEmpty().withMessage("Pleas, Enter Password"),
  ];
};
module.exports = {
  validate,
};
