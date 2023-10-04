/// NOTE: Npm Packages...

const courseModel = require("../model/course.modle.js");
const asyncHandler = require("express-async-handler");
const httpStatusText = require("../utilits/statuscode.text.js");
const customError = require("../utilits/custom.error.js");
const { validationResult } = require("express-validator");

const getAllCourses = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const limit = 3;
  const courses = await courseModel
    .find(
      {},
      {
        __v: false,
      }
    )
    .limit(limit);
  const countDocuments = parseInt(await courseModel.countDocuments());

  if (countDocuments === 0) {
    return next(
      customError.create("There Not Document ADD yet", 404, httpStatusText.FAIL)
    );
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { courses, countDocuments: limit },
  });
});

const getOneCourses = asyncHandler(async (req, res, next) => {
  const courseID = req.params.id;
  await courseModel
    .findById(courseID, { _id: false, __v: false })
    .then((course) => {
      if (!course)
        return res.status(404).json({
          status: httpStatusText.FAIL,
          message: "Course not Found with ID",
        });

      res.status(200).json({ status: httpStatusText.SUCCESS, course });
    })
    .catch((err) => {
      next(customError.create(err.message, 404, httpStatusText.ERROR));
    });
});

//
/// Needed error handling
const createCourse = asyncHandler(async (req, res, next) => {
  const createdCourse = req.body;

  const result = validationResult(req);

  if (result.isEmpty()) {
    await courseModel
      .create(createdCourse)
      .then((data) => {
        return res.status(200).json({ status: httpStatusText.SUCCESS, data });
      })
      .catch(() => {
        return res
          .status(400)
          .json({ status: httpStatusText.FAIL, message: "Course Not Created" });
      });
  } else {
    res
      .status(400)
      .json({ status: httpStatusText.FAIL, message: result.array()[0].msg });
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  const courseID = req.params.id;
  const courseUpated = req.body;

  if (courseID.length === 24) {
    await courseModel
      .findByIdAndUpdate(courseID, courseUpated)
      .then(() => {
        res.status(200).send("Course is updated");
      })
      .catch((err) => res.json({ error: err.message }));
  } else {
    res.status(404).json({ error: "Id must be 24 characters" });
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  const courseID = req.params.id;

  if (courseID.length === 24) {
    await courseModel
      .findByIdAndDelete(courseID)
      .then(() => {
        res.status(200).send("Course is is Deleted");
      })
      .catch(() => res.status(404).send("Course isn't Found "));
  } else {
    res.status(404).json({ error: "Id must be 24 characters" });
  }
});

const deleteAllCourse = asyncHandler(async (req, res) => {
  await courseModel
    .deleteMany()
    .then(() =>
      res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "All Documents Course Deleted",
      })
    )
    .catch(() => {
      customError.create("No Documents Deleted", 400, httpStatusText.FAIL);
    });
});

module.exports = {
  getAllCourses,
  getOneCourses,
  updateCourse,
  deleteCourse,
  createCourse,
  deleteAllCourse,
};
