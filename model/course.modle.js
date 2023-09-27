import mongoose from "mongoose";

import { courseSchema } from "../schema/course.schema.js";

export const Model = mongoose.model("courses", courseSchema);
