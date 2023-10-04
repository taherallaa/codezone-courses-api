const userModel = require("../model/user.model");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utilits/statuscode.text.js");

const getAllUser = asyncHandler(async (req, res) => {
  await userModel
    .countDocuments()
    .then(async (count) => {
      if (count === 0) {
        return res.status(200).json({
          status: httpStatusText.FAIL,
          data: "There Not Document ADD yet",
        });
      }

      await userModel
        .find({}, { _id: false, __v: false })
        .then((data) => {
          res.status(200).json({ status: httpStatusText.SUCCESS, data });
        })
        .catch(() => {
          console.log("i'm on find");
          res
            .status(500)
            .json({ status: httpStatusText.ERROR, message: "server error" });
        });
    })
    .catch(() => {
      console.log("i'm on count");
      res
        .status(500)
        .json({ status: httpStatusText.ERROR, message: "server error" });
    });
});

const createUser = asyncHandler(async (req, res, next) => {
  const newUser = req.body;
  const result = validationResult(req);

  if (result.isEmpty()) {
    await userModel
      .create(newUser)
      .then((data) => {
        return res.status(200).json({ status: httpStatusText.SUCCESS, data });
      })
      .catch((e) => {
        next(e);
      });
  } else {
    res
      .status(400)
      .json({ status: httpStatusText.FAIL, message: result.array()[0].msg });
  }
});

const deleteAllUser = asyncHandler(async (req, res) => {
  await userModel
    .deleteMany()
    .then((message) => {
      res.status(200).json({ status: httpStatusText.SUCCESS, message });
    })
    .catch(() => {
      res.send("df");
    });
});

const deleteUser = asyncHandler(async (req, res) => {
  const userID = req.params.id;
  await userModel
    .findByIdAndDelete(userID)
    .then((data) => {
      res.status(200).json({ status: httpStatusText.SUCCESS, data });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ status: httpStatusText.ERROR, message: error.message });
    });
});

const editUser = asyncHandler(async (req, res, next) => {
  const userID = req.params.id;
  const updatedUser = req.body;

  await userModel
    .findByIdAndUpdate(userID, updatedUser)
    .then(() => {
      res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "User is Updated successfully",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = {
  getAllUser,
  createUser,
  deleteUser,
  deleteAllUser,
  editUser,
};
