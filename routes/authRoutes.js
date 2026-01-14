const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/upload");
const authCtrl = require("../controllers/authController");


router.post("/register", upload.single("image"), authCtrl.register);
router.post("/login", authCtrl.login);

module.exports = router;
