const express = require("express");
const newRoute = express.Router();
const eventController = require("../Controllers/eventController");

newRoute
  .route("/")
  .get(eventController.getEvent)
  .post(eventController.addEvent);
newRoute
  .route("/:id")
  .delete(eventController.deleteEvent)
  .patch(eventController.editEvent);

module.exports = newRoute;
