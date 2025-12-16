
const Stop = require("../models/Stop");

// CREATE STOP
const createStop = async (req, res) => {
  try {
    const stop = await Stop.create(req.body);
    res.status(201).json(stop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL STOPS
const getStops = async (req, res) => {
  try {
    const stops = await Stop.find();
    res.json(stops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET STOP BY ID
const getStopById = async (req, res) => {
  try {
    const stop = await Stop.findById(req.params.stopId);

    if (!stop) {
      return res.status(404).json({ msg: "Parada no encontrada" });
    }

    res.json(stop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE STOP
const updateStop = async (req, res) => {
  try {
    const stop = await Stop.findByIdAndUpdate(
      req.params.stopId,
      { $set: req.body },
      { new: true }
    );

    if (!stop) {
      return res.status(404).json({ msg: "Parada no encontrada" });
    }

    res.json(stop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE STOP
const deleteStop = async (req, res) => {
  try {
    const stop = await Stop.findByIdAndDelete(req.params.stopId);

    if (!stop) {
      return res.status(404).json({ msg: "Parada no encontrada" });
    }

    res.json({ msg: "Parada eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createStop,
  getStops,
  getStopById,
  updateStop,
  deleteStop
};
