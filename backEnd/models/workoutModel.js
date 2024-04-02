const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    type1: { type: String, required: true },
    volume1: { type: String, required: true },
    type2: { type: String, required: true },
    volume2: { type: String, required: true },
    execId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
