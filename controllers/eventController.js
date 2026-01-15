const Event = require("../models/Event");

async function createEvent(req, res) {
  try {
    const {
      title,
      description,
      date,
      meetingAddress,
      departTime,
      returnTime,
    } = req.body;

    // 📍 startLocation
    const startLocationParsed = req.body.startLocation
      ? JSON.parse(req.body.startLocation)
      : null;

    if (
      !startLocationParsed ||
      !Array.isArray(startLocationParsed.coordinates) ||
      startLocationParsed.coordinates.length !== 2
    ) {
      return res.status(400).json({ msg: "Ubicación inicial inválida." });
    }

    startLocationParsed.coordinates =
      startLocationParsed.coordinates.map(Number);

    // 🛑 stops (Postman + Frontend compatible)

let stopsParsed = [];

if (req.body.stops) {
  try {
    const parsed = JSON.parse(req.body.stops);

    if (Array.isArray(parsed)) {
      stopsParsed = parsed.map(id => id.toString());
    } else {
      stopsParsed = [parsed.toString()];
    }
  } catch (e) {
    // fallback total
    stopsParsed = Array.isArray(req.body.stops)
      ? req.body.stops
      : [req.body.stops];
  }
}



    // ✅ validación final
    if (!title || !date || !departTime) {
      return res.status(400).json({
        msg: "Título, fecha y hora de salida son obligatorios."
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
  stops: stopsParsed, // 🔥 ACA
  imageUrl: req.file ? req.file.path : null
});

    return res.status(201).json(event);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Error al crear evento",
      err
    });
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
