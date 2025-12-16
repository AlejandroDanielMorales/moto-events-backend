// models/Stop.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StopSchema = new Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }
  },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

StopSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Stop", StopSchema);
