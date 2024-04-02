const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workouts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout",
      required: false,
    },
  ],
  userId: { type: String, required: true },
});

const Excercise = mongoose.model("Excercise", exerciseSchema);
module.exports = Excercise;
