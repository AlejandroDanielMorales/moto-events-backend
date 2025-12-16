const express = require("express");
const router = express.Router();
const { onlyOwnerMiddleware } = require("../middlewares/onlyOwnerMiddleware");
const motoCtrl = require("../controllers/motoController");

router.post("/", onlyOwnerMiddleware, motoCtrl.createMoto);
router.get("/me", onlyOwnerMiddleware, motoCtrl.getMyMotos);
router.get("/:motoId", onlyOwnerMiddleware, motoCtrl.getMotoById);
router.put("/:motoId", onlyOwnerMiddleware, motoCtrl.updateMoto);
router.delete("/:motoId", onlyOwnerMiddleware, motoCtrl.deleteMoto);

module.exports = router;