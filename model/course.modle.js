const mongoose = require("mongoose");
const courseSchema = require("../schema/course.schema");

const courseModel = mongoose.model("courses", courseSchema);

module.exports = courseModel;
