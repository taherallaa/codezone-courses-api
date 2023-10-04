const router = require("express").Router();

const controller = require("../controller/user.controller");

const userSchema = require("../validation/validate.userSchema");

router
  .route("/")
  .get(controller.getAllUser)
  .post(userSchema.validate(), controller.createUser)
  .delete(controller.deleteAllUser);

router.route("/:id").patch(controller.editUser).delete(controller.deleteUser);

module.exports = router;
