const express = require("express");
const newRoute = express.Router();
const workoutController = require("../Controllers/workoutController");

newRoute.route("/create").post(workoutController.createWorkout);
newRoute.route("/:id").delete(workoutController.deleteWorkout);
newRoute.route("/").get(workoutController.allWorkouts)
module.exports = newRoute;
