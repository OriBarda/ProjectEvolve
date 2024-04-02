const mongoose = require("mongoose");

const eventScehma = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  color: { type: String, required: true },
  userId: { type: String, required: true },
});

const Event = mongoose.model("Event", eventScehma);
module.exports = Event;
