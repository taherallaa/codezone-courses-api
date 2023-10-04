const router = require("express").Router();
const controller = require("../controller/course.controllers.js");
const userSchema = require("../validation/validate.course.schema.js");

router
  .route("/")
  .get(controller.getAllCourses)
  .post(userSchema.validate(), controller.createCourse)
  .delete(controller.deleteAllCourse);

router
  .route("/:id")
  .get(controller.getOneCourses)
  .put(controller.updateCourse)
  .delete(controller.deleteCourse);

module.exports = router;
