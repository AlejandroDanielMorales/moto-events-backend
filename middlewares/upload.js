const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cloudinary lee CLOUDINARY_URL automáticamente
cloudinary.config({
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "moto-events",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1200, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = { upload };
