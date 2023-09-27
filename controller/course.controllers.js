/// NOTE: Npm Packages...

import * as course from "../model/course.modle.js";

import asyncHandler from "express-async-handler";

export const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await course.Model.find()
    .skip(3)
    .limit(3)
    .select("-_id -__v");
  const countDocuments = parseInt(await course.Model.countDocuments());

  if (countDocuments === 0)
    return res.status(404).json({ errors: "There Not Document ADD yet" });

  res.status(200).json({ courses, countDocuments });
});

export const getOneCourses = asyncHandler(async (req, res) => {
  const courseID = req.params.id;

  if (courseID.length === 24) {
    await course.Model.findById(courseID)
      .select("-_id -__v")
      .then((course) => {
        res.json(course);
      })
      .catch((err) => res.send(err.message));
  } else {
    res.status(404).json({ error: "Id must be 24 characters" });
  }
});

/// Needed error handling

export const createCourse = asyncHandler(async (req, res) => {
  const createdCourse = req.body;

  await course.Model.create(createdCourse)
    .then((newCourse) => {
      res.json({ createdCourse: newCourse });
    })
    .catch(() => {
      res.status(404).json({ error: "course not add" });
    });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const courseID = req.params.id;
  const courseUpated = req.body;

  if (courseID.length === 24) {
    await course.Model.findByIdAndUpdate(courseID, courseUpated)
      .then(() => {
        res.status(200).send("Course is updated");
      })
      .catch((err) => res.json({ error: err.message }));
  } else {
    res.status(404).json({ error: "Id must be 24 characters" });
  }
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const courseID = req.params.id;

  if (courseID.length === 24) {
    await course.Model.findByIdAndDelete(courseID)
      .then(() => {
        res.status(200).send("Course is is Deleted");
      })
      .catch(() => res.status(404).send("Course isn't Found "));
  } else {
    res.status(404).json({ error: "Id must be 24 characters" });
  }
});
