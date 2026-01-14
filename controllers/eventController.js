const Event = require("../models/Event");

async function createEvent(req, res) {
  try {
    const {
      title,
      description,
      date,
      startLocation,
      meetingAddress,
      departTime,
      returnTime,
      stops
    } = req.body;

    const startLocationParsed = req.body.startLocation
  ? JSON.parse(req.body.startLocation)
  : null;

// ahora validamos con el objeto parseado
if (!title || !date || !departTime || !startLocationParsed || !startLocationParsed.coordinates) {
  return res.status(400).json({
    msg: "Título, fecha, hora de salida y ubicación inicial son obligatorios."
  });
}

    const event = await Event.create({
      title,
      description,
      date,
      startLocation: startLocationParsed,
      meetingAddress,
      departTime,
      returnTime,
      stops,
      createdBy: req.user._id,
      imageUrl: req.file ? req.file.path : null // 👈 URL Cloudinary si hay imagen
    });

    return res.status(201).json(event);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error al crear evento", err });
  }
}


async function getEvents(req, res) {
  const events = await Event.find()
    .populate("stops") // opcional
    .sort({ date: 1 });

  return res.json(events);
}

async function getEvent(req, res) {
  const event = await Event.findById(req.params.id)
    .populate("stops") // opcional
    .sort({ date: 1 });

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
