const Event = require("../models/Event");
const Registration = require("../models/Registration");

async function createEvent(req, res) {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user._id
    });
    return res.json(event);
  } catch (err) {
    return res.status(500).json({ msg: "Error al crear evento", err });
  }
}

async function getEvents(req, res) {
  const events = await Event.find().sort({ date: 1 });
  return res.json(events);
}

async function getEvent(req, res) {
  const event = await Event.findById(req.params.id);
  return res.json(event);
}

async function deleteEvent(req, res) {
  await Event.findByIdAndDelete(req.params.id);
  return res.json({ msg: "Evento eliminado" });
}

// acá exportás TODO el objeto de una sola vez
module.exports = {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent
};
