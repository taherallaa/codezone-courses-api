import express from "express";
import * as router from "./routes/course.routes.js";
import * as connect from "./database/connectDB.js";

/// connect to database
connect.connectMongodbAtlas();

const app = express();
const port = 3000;

/// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/courses", router.router);

app.listen(port, () => {
  console.log(`server is running on http:localhost:${port}`);
});
