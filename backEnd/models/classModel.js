const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  plans: [{ type: String, required: true }],
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: false }],
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
