const express = require("express");
const router = express.Router();
const stopController = require("../controllers/stopController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

// CRUD de paradas dentro de eventos
router.post("/:eventId/stops", authMiddleware, adminMiddleware, stopController.addStop);
router.put("/:eventId/stops/:stopId", authMiddleware, adminMiddleware, stopController.updateStop);
router.delete("/:eventId/stops/:stopId", authMiddleware, adminMiddleware, stopController.deleteStop);

module.exports = router;
