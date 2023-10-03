const express = require("express");
const cors = require("cors");
const router = require("./routes/course.routes.js");
const connectDB = require("./database/connectDB.js");
const httpStatusText = require("./utilits/statuscode.text.js");

/// connect to database
connectDB();

const app = express();
const port = 3000;

/// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/courses", router);

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
  console.log(error.message);

  res.status(error.statusCode ?? 404).json({
    status: error.statusText ?? httpStatusText.FAIL,
    data: error.message,
  });
});

app.listen(port, () => {
  console.log(`server is running on http:localhost:${port}`);
});
