const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { upload } = require("../middlewares/upload");

router.post("/", authMiddleware, adminMiddleware, upload.single("images"), eventController.createEvent);
router.get("/", authMiddleware, eventController.getEvents);
router.get("/:id", authMiddleware, eventController.getEvent);
router.delete("/:id", authMiddleware, adminMiddleware, eventController.deleteEvent);

module.exports = router;
