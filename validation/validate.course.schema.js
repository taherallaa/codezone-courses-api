const { body } = require("express-validator");

const validate = () => {
  return [
    body("price")
      .notEmpty()
      .withMessage("Please, price is Required")
      .isNumeric()
      .withMessage("Title must be Number"),

    body("title")
      .notEmpty()
      .withMessage("Please, Title is Required")
      .isString()
      .withMessage("Title must be String"),
  ];
};

module.exports = {
  validate,
};
