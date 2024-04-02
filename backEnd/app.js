const express = require("express");
const userRoute = require("./Routes/userRoute");
const execRoute = require("./Routes/execRoute");
const workoutRoute = require("./Routes/workoutRoute");
const classRoute = require("./Routes/classRoute");
const eventRoute = require("./Routes/eventRoute");
const userController = require("./Controllers/userController");
const classController = require("./Controllers/classController");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.post("/api/upload/", (req, res) => {
  try {
    const fileStr = req.body.data;
    console.log(fileStr);
  } catch (err) {
    console.log(err);
  }
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/users/login", userController.handleLogin);
app.use("/users/signup", userController.createUser);
app.use("/class/remove", classController.removeAllUsers);
app.use(userController.verifyToken);
app.use("/class", classRoute);
app.use("/users", userRoute);
app.use("/exec", execRoute);
app.use("/workout", workoutRoute);
app.use("/event", eventRoute);
module.exports = app;
