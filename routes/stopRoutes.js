const express = require("express");
const router = express.Router();
const stopController = require("../controllers/stopController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

// CRUD de paradas dentro de eventos
router.post("/stops", authMiddleware, adminMiddleware, stopController.createStop);
router.put("/stops/:stopId", authMiddleware, adminMiddleware, stopController.updateStop);
router.delete("/stops/:stopId", authMiddleware, adminMiddleware, stopController.deleteStop);

module.exports = router;
