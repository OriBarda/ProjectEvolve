const express = require("express");
const newRoute = express.Router();
const userController = require("../Controllers/userController");

newRoute.route("/").get(userController.handleLogOut);
newRoute.route("/signup").post(userController.createUser);
newRoute.route("/authenticate").get(userController.verifyToken);
newRoute.route("/login").post(userController.handleLogin);
newRoute
  .route("/:id")
  .patch(userController.editUser)
  .delete(userController.deleteUser)
  .get(userController.fetchUserById);
module.exports = newRoute;
