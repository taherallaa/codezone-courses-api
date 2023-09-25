const { body, validationResult } = require("express-validator");

const validateSchema = () => {
  return [
    body("title")
      .isEmpty()
      .withMessage("Course Title is Require")
      .isLength({ min: 4 })
      .withMessage("Course Title must be more than 4 characters"),
    body("price")
      .isEmpty()
      .withMessage("Course Title is Require")
      .isNumeric()
      .withMessage("Price must be number"),
  ];
};

module.exports = {
  validateSchema,
};
