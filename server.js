const express = require("express");
const fs = require("node:fs");

const userRoutes = require("./routes/course.routes");
const connect = require("./database/connectDB.js");

/// connect to database
connect.connectMongodbAtlas();

const app = express();
const port = 3000;

/// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/courses", userRoutes);

app.listen(port, () => {
  console.log(`server is running on http:localhost:${port}`);
});
