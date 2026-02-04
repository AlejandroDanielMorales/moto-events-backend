const Moto = require("../models/Moto");

async function createMoto(req, res) {
  console.log("🚀 createMoto → request recibida");

  try {
    // 1️⃣ Log inicial del request
    console.log("📥 BODY recibido:", req.body);
    console.log("📷 FILE recibido:", req.file);

    const {
      owner,
      brand,
      model,
      year,
      displacementCc,
      plate,
      color
    } = req.body;

    const motoData = {
      owner,
      brand,
      model,
      year,
      displacementCc,
      plate,
      color,
      image: req.file ? req.file.path : null
    };

    console.log("📦 Datos a guardar en Mongo:", motoData);

    // 6️⃣ Guardar en DB
    const moto = await Moto.create(motoData);

    console.log("🎉 Moto creada con éxito:", moto._id);

    res.status(201).json(moto);

  } catch (err) {
    // 7️⃣ Catch ultra descriptivo
    console.error("❌ ERROR en createMoto");
    console.error("🧠 Mensaje:", err.message);
    console.error("🏷️ Nombre:", err.name);
    console.error("🔢 Código:", err.code);
    console.error("🧩 Errores de validación:", err.errors);
    console.error("📚 Stack:", err.stack);

    res.status(500).json({
      message: "Error creando moto"
    });
  }
}


// Obtener mis motos
async function getMyMotos(req, res) {
    try {
        const motos = await Moto.find({ owner: req.user.id });
        res.json(motos);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener motos" });
    }
}

// Obtener una moto por ID (solo si es dueño)
async function getMotoById(req, res) {
    try {
        const moto = await Moto.findOne({
            _id: req.params.motoId
        });

        if (!moto) {
            return res.status(404).json({
                message: "Moto no encontrada"
            });
        }

        res.json(moto);
    } catch (err) {
        res.status(500).json({ message: "Error al buscar moto" });
    }
}

// Actualizar moto (solo dueño)
async function updateMoto(req, res) {
  try {
    const allowedFields = [
      "brand",
      "model",
      "year",
      "displacementCc",
      "plate",
      "color"
    ];

    const data = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    // 👇 si viene imagen nueva
    if (req.file) {
      data.image = req.file.path;
    }

    const moto = await Moto.findOneAndUpdate(
      { _id: req.params.motoId},
      { $set: data },
      { new: true }
    );

    if (!moto) {
      return res.status(404).json({
        message: "Moto no encontrada o sin permisos"
      });
    }

    res.json(moto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar moto" });
  }
}


// Eliminar moto (solo dueño)
async function deleteMoto(req, res) {
    try {
        const moto = await Moto.findOneAndDelete({
            _id: req.params.motoId
        });

        if (!moto) {
            return res.status(404).json({
                message: "Moto no encontrada o sin permisos"
            });
        }

        res.json({ message: "Moto eliminada correctamente" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar moto" });
    }
}
async function getAllMotos(req, res) {
    try {
        const motos = await Moto.find();    
        res.json(motos);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener motos" });
    }
}


module.exports = {
    getAllMotos,
    createMoto,
    getMyMotos,
    getMotoById,
    updateMoto,
    deleteMoto
};
