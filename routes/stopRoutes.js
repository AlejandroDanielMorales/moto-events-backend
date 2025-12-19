const express = require("express");
const router = express.Router();
const stopController = require("../controllers/stopController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

// CRUD de paradas dentro de eventos
router.post("/", authMiddleware, adminMiddleware, stopController.createStop);
router.put("/:stopId", authMiddleware, adminMiddleware, stopController.updateStop);
router.delete("/:stopId", authMiddleware, adminMiddleware, stopController.deleteStop);
router.get("/", authMiddleware, stopController.getStops);

module.exports = router;
