const Registration = require("../models/Registration");

const registerToEvent = async (req, res) => {
  try {
    const registration = await Registration.create({
      eventId: req.params.eventId,
      userId: req.user._id
    });

    return res.json({ msg: "Inscripción realizada", registration });
  } catch (err) {
    return res.status(500).json({ msg: "Error en inscripción", err });
  }
};

const unregisterFromEvent = async (req, res) => {
  try {
    await Registration.findOneAndDelete({
      eventId: req.params.eventId,
      userId: req.user._id
    });

    return res.json({ msg: "Inscripción cancelada" });
  } catch (err) {
    return res.status(500).json({ msg: "Error al cancelar inscripción", err });
  }
};

module.exports = {
  registerToEvent,
  unregisterFromEvent
};
