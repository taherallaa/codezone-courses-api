const express = require("express");
const cors = require("cors");
const courseRouter = require("./routes/course.routes.js");
const userRouter = require("./routes/user.routes.js");

const connectDB = require("./database/connectDB.js");
const httpStatusText = require("./utilits/statuscode.text.js");

connectDB();

const app = express();
const port = 3000;

/// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/users", userRouter);

// Handle Not Available Resourse
app.all("*", (req, res, next) => {
  //console.log(error);
  res.status(500).json({
    status: httpStatusText.ERROR,
    message: "this resourse isn't avaliable",
  });
  next();
});

/// handle custom error
app.use((error, req, res, next) => {
  const errors = {};

  /// handle unique value withe error message 11000
  if (error.code === 11000) {
    console.log("i'm in 11000 error");
    for (const key in error.keyValue) {
      errors[key] = error.keyValue[key];
      return res.status(400).json({ message: `${key} must be unique` });
    }
  }

  /// handle unique value with error message user validation failed
  if (
    error.message.includes("User validation failed") ||
    error.message.includes("user validation failed")
  ) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });

    console.log("i'm in user validation failed");
    return res.status(404).json({
      status: httpStatusText.FAIL,
      message: errors,
    });
  }

  console.log("i'm in last error handle test");
  res.status(error.statusCode ?? 404).json({
    status: error.statusText ?? httpStatusText.FAIL,
    data: error.message,
  });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
