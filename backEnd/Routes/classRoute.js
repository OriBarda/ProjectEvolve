const express = require("express");
const newRoute = express.Router();
const classController = require("../Controllers/classController");

newRoute
  .route("/")
  .get(classController.getClass)
  .post(classController.createClass);
newRoute
  .route("/:classId/:userId")
  .delete(classController.removeUser)
  .post(classController.addUser);
newRoute.route("/remove").get(classController.removeAllUsers);
module.exports = newRoute;
