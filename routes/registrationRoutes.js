const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const registrationCtrl = require("../controllers/registrationController");

// INSCRIBIRSE A UN EVENTO
router.post("/:eventId", authMiddleware, registrationCtrl.registerToEvent);

// DESINSCRIBIRSE DE UN EVENTO
router.delete("/:eventId", authMiddleware, registrationCtrl.unregisterFromEvent);

module.exports = router;
