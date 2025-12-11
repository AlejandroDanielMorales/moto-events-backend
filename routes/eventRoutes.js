const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, eventController.createEvent);
router.get("/", authMiddleware, eventController.getEvents);
router.get("/:id", authMiddleware, eventController.getEvent);
router.delete("/:id", authMiddleware, adminMiddleware, eventController.deleteEvent);

module.exports = router;
