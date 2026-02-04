const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "moto-events",

    // 🔥 aceptar HEIC también
    allowed_formats: ["jpg", "jpeg", "png", "webp", "heic", "heif"],

    // 🔥 forzar conversión
    format: "webp",

    // 🔥 optimización automática
    transformation: [
      { width: 1200, crop: "limit" },
      { quality: "auto" },
      { fetch_format: "auto" }
    ],
  }),
});

const upload = multer({ storage });

module.exports = { upload };
