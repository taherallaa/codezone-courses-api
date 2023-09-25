const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "require title of course"],
  },
  price: {
    type: Number,
    require: [true, "require price of course"],
  },
});

module.exports = courseSchema;
