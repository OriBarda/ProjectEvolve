const Workout = require("../models/workoutModel");
const Excercise = require("../models/execModel");

exports.createWorkout = async (req, res) => {
  try {
    const newWorkout = await Workout.create(req.body);
    const exec = await Excercise.findById(newWorkout.execId);
    exec.workouts.push(newWorkout);
    await exec.save();
    res.send(newWorkout);
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const exec = await Excercise.findById(deletedWorkout.execId);
    exec.workouts = exec.workouts.filter(
      (workout) => workout.toString() !== req.params.id
    );

    await exec.save();

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.allWorkouts = async (req, res) => {
  try {
    const all = await Workout.find({});
    res.send(all);
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
