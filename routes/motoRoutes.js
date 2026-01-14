const express = require("express");
const router = express.Router();
const { onlyOwnerMiddleware } = require("../middlewares/onlyOwnerMiddleware");
const { upload } = require("../middlewares/upload");
const motoCtrl = require("../controllers/motoController");

// Crear moto con imagen (usuario autenticado)
router.post(
  "/",
  onlyOwnerMiddleware,
  upload.single("image"), // 👈 CLAVE
  motoCtrl.createMoto
);

// Update moto con imagen opcional
router.put(
  "/:motoId",
  onlyOwnerMiddleware,
  upload.single("image"), // 👈 CLAVE
  motoCtrl.updateMoto
);

// Resto sin cambios
router.post(
  "/add",
  upload.single("image"),
  motoCtrl.addMoto
);
router.get("/me", onlyOwnerMiddleware, motoCtrl.getMyMotos);
router.get("/:motoId", onlyOwnerMiddleware, motoCtrl.getMotoById);
router.delete("/:motoId", onlyOwnerMiddleware, motoCtrl.deleteMoto);
router.get("/", motoCtrl.getAllMotos);

module.exports = router;
