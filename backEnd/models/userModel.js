const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: "Excercise",
        required: false,
      },
    ],
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: false,
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
