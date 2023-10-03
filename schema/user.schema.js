const mongoose = require("mongoose");
const { isEmail } = require("express-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username must be unique"],
    required: [true, "Pleas, Enter username"],
  },
  email: {
    type: String,
    unique: [true, "Email must be unique"],
    required: [true, "Pleas, Enter Email"],
    validate: [isEmail, "Please, Enter Valide Email"],
  },
  password: {
    type: String,
    required: [true, "Pleas, Enter Password"],
  },
});

module.exports = userSchema;
