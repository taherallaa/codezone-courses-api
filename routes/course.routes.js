const router = require("express").Router();
const controller = require("../controller/course.controllers.js");
const validateSchema = require("../validation/validate.course.schema.js");

router
  .route("/")
  .get(controller.getAllCourses)
  .post(validateSchema.validate(), controller.createCourse)
  .delete(controller.deleteAllCourse);

router
  .route("/:id")
  .get(controller.getOneCourses)
  .put(controller.updateCourse)
  .delete(controller.deleteCourse);

module.exports = router;
