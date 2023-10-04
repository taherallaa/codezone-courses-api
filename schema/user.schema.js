const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} must be unique.",
});

module.exports = userSchema;
