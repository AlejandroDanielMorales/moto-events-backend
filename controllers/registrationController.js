const Registration = require("../models/Registration");

const registerToEvent = async (req, res) => {
  try {
    const {
      withCompanion = false,
      companionName,
      motoId
    } = req.body;

    // Validación simple
    if (withCompanion && !companionName) {
      return res.status(400).json({
        msg: "Debe indicar el nombre del acompañante"
      });
    }

    const registration = await Registration.create({
      eventId: req.params.eventId,
      userId: req.user._id,
      motoId,
      withCompanion,
      companionName
    });

    return res.status(201).json({
      msg: "Inscripción realizada",
      registration
    });

  } catch (err) {
    // Error por índice unique (ya inscripto)
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "El usuario ya está inscripto en este evento"
      });
    }

    return res.status(500).json({
      msg: "Error en inscripción",
      error: err.message
    });
  }
};

const unregisterFromEvent = async (req, res) => {
  try {
    const deleted = await Registration.findOneAndDelete({
      eventId: req.params.eventId,
      userId: req.user._id
    });

    if (!deleted) {
      return res.status(404).json({
        msg: "No se encontró inscripción para cancelar"
      });
    }

    return res.json({
      msg: "Inscripción cancelada"
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Error al cancelar inscripción",
      error: err.message
    });
  }
};

module.exports = {
  registerToEvent,
  unregisterFromEvent
};
