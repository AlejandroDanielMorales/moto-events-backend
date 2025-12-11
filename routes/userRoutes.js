const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authMiddleware }= require("../middlewares/authMiddleware");

// Todo requiere estar logueado
router.get("/me", authMiddleware, userController.getMyProfile);
router.put("/me", authMiddleware, userController.updateMyProfile);
router.delete("/me", authMiddleware, userController.deleteMyAccount);

router.get("/:userId", authMiddleware, userController.getUserById);

module.exports = router;
