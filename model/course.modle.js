const mongoose = require("mongoose");

const courseSchema = require("../schema/course.schema.js");

const courseModel = mongoose.model("courses", courseSchema);

module.exports = courseModel;
