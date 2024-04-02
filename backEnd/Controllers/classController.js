const Class = require("../models/classModel");
const User = require("../models/userModel");

exports.getClass = async (req, res) => {
  try {
    const returnAllClass = await Class.find({});
    if (!returnAllClass) {
      return res.status(404).send({ message: "returnAllClass not found" });
    }
    res.send(returnAllClass);
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.createClass = async (req, res) => {
  try {
    const { title, description, time, plans } = req.body;
    const newClass = await Class.create({
      title,
      description,
      time,
      plans,
    });
    res.send(newClass);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { classId, userId } = req.params;
    const addedUser = await User.findById(userId);
    if (!addedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const updatedClass = await Class.findOneAndUpdate(
      { _id: classId },
      { $push: { users: addedUser._id } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).select("-title -description -time");
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { classes: classId } },
      { new: true, upsert: true }
    );

    res.send({ addedUser, updatedClass, updatedUser });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: err.message });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const { userId, classId } = req.params;
    const ClassIdToDelete = classId;
    const userToRemove = await User.findById(userId);
    userToRemove.classes = userToRemove.classes.filter(
      (matchingClass) => matchingClass.toString() !== ClassIdToDelete
    );
    await userToRemove.save();

    if (!userToRemove) {
      return res.status(404).send({ message: "User not found" });
    }

    const classToRemoveFrom = await Class.findById(classId);
    classToRemoveFrom.users = classToRemoveFrom.users.filter(
      (matchingUser) => matchingUser.toString() !== userId
    );
    await classToRemoveFrom.save();
    res.send({ userToRemove, classToRemoveFrom });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: err.message });
  }
};

exports.removeAllUsers = async (req, res) => {
  try {
    const allClasses = await Class.find({});
    allClasses.forEach(async (oneClass) => {
      oneClass.users = [];
      await oneClass.save(); 
    });
    res.status(200).json({ message: 'All users removed from classes successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while removing users from classes.' });
  }
};