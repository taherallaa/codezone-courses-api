import { Router } from "express";

export const router = new Router();

import * as controller from "../controller/course.controllers.js";

router.route("/").get(controller.getAllCourses).post(controller.createCourse);

router
  .route("/:id")
  .get(controller.getOneCourses)
  .put(controller.updateCourse)
  .delete(controller.deleteCourse);
