const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const validate = require("../validation/validate.schema");
const controller = require("../controller/course.controllers");

router.route("/").get(controller.getAllCourses).post(controller.createCourse);

router
  .route("/:id")
  .get(controller.getOneCourses)
  .put(controller.updateCourse)
  .delete(controller.deleteCourse);

module.exports = router;
