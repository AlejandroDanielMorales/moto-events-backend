const express = require("express");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  (req, res) => {
    res.json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  }
);

module.exports = router;
