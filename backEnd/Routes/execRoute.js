const express = require("express");
const newRoute = express.Router();
const execController = require("../Controllers/execController");

newRoute
  .route("/")
  .get(execController.getExcercise)
  .post(execController.addExcercise);
newRoute
  .route("/:id")
  .delete(execController.deleteExercise)

module.exports = newRoute;
