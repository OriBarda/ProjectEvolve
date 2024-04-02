const Excercise = require("../models/execModel");
const User = require("../models/userModel");

exports.getExcercise = async (req, res) => {
  try {
    const exercise = await Excercise.find({});
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.json(exercise);
    return res.status(500).send({ message: "Internal Server Error" });
  } catch (err) {}
};

exports.addExcercise = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newExercise = await Excercise.create(req.body);
    user.exercises.push(newExercise);
    await user.save();
    res.json({ user, newExercise });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const exerciseIdToDelete = req.params.id;
    const deletedExercise = await Excercise.findByIdAndDelete(
      exerciseIdToDelete
    );
    if (!deletedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    const user = await User.findById(deletedExercise.userId);
    res.status(200).json({ message: "Exercise deleted successfully" });
    user.exercises = user.exercises.filter(
      (exec) => exec.toString() !== exerciseIdToDelete
    );
    await user.save();
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
