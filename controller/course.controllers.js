const fs = require("node:fs");

/// NOTE: Npm Packages...
const courseModle = require("../model/course.modle");
const { validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const courseModel = require("../model/course.modle");

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await courseModle.find();
  const countDocuments = parseInt(await courseModle.countDocuments());

  if (countDocuments === 0)
    return res.status(404).json({ errors: "There Not Document ADD yet" });

  res.status(200).json(courses);
});

const getOneCourses = asyncHandler(async (req, res) => {
  const courseID = req.params.id;

  if (courseID.length === 24) {
    await courseModel
      .findById(courseID)
      .then((course) => {
        res.json(course);
      })
      .catch((err) => res.send(err.message));
  } else {
    res.status(404).json({ error: "Id must be 24 characters" });
  }
});

/// Needed error handling
const createCourse = asyncHandler(async (req, res) => {
  const createdCourse = req.body;
  const newCourse = await courseModle.create(createdCourse);
  if (!newCourse) return res.status(404).json({ error: "course not add" });
  res.json({ createdCourse: newCourse });
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
      .catch((err) => res.json({ error: err.message }));
  } else {
    res.status(404).json({ error: "Id must be 24 characters" });
  }
});

module.exports = {
  getAllCourses,
  getOneCourses,
  updateCourse,
  deleteCourse,
  createCourse,
};
