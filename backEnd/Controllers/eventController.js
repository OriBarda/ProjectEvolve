const Event = require("../models/eventModel");
const User = require("../models/userModel");

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.find({});
    if (!event) {
      return res.status(404).send({ message: "event not found" });
    }
    res.json(event);
  } catch (err) {}
};

exports.addEvent = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newEvent = await Event.create(req.body);
    user.events.push(newEvent);
    await user.save();
    res.json({ user, newEvent });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventIdToDelete = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventIdToDelete);
    const user = await User.findById(deletedEvent.userId);
    user.events = user.events.filter(
      (event) => event.toString() !== eventIdToDelete
    );
    await user.save();
    if (!deletedEvent) {
      return res.status(404).send({ message: "event not found" });
    }
    res.status(200).send({ message: "event deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.editEvent = async (req, res) => {
  try {
    const eventToEdit = req.params.id;

    const editedEvent = await Event.findById(eventToEdit);
    editedEvent.title = req.body.title;
    editedEvent.description = req.body.description;
    editedEvent.start = req.body.start;
    editedEvent.end = req.body.end;
    editedEvent.color = req.body.color;
    await editedEvent.save();

    if (!editedEvent) {
      return res.status(404).send({ message: "Event not found" });
    }

    res.status(200).send({ message: "Event edited successfully", editedEvent });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
