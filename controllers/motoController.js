const Moto = require("../models/Moto");

// Crear moto (usuario autenticado)
async function createMoto(req, res) {
  try {
    const {
      brand,
      model,
      year,
      displacementCc,
      plate,
      color
    } = req.body;

    if (!brand || !model) {
      return res.status(400).json({
        message: "Marca y modelo son obligatorios"
      });
    }

    const moto = await Moto.create({
      owner: req.user.id,
      brand,
      model,
      year,
      displacementCc,
      plate,
      color,
      photoUrl: req.file ? req.file.path : null // 👈 URL Cloudinary
    });

    res.status(201).json(moto);
  } catch (err) {
    console.error(err);
    
    res.status(500).json({ message: `${req.body}` });
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
            _id: req.params.motoId,
            owner: req.user.id
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
      data.photoUrl = req.file.path;
    }

    const moto = await Moto.findOneAndUpdate(
      { _id: req.params.motoId, owner: req.user.id },
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
            _id: req.params.motoId,
            owner: req.user.id
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
async function addMoto(req, res) {
    try {
        const {
            owner, // 👈 opcional para dev
            brand,
            model,
            photoUrl,
            year,
            displacementCc,
            plate,
            color
        } = req.body;

        if (!brand || !model) {
            return res.status(400).json({
                message: "Marca y modelo son obligatorios"
            });
        }

        // 🔑 Resolver owner
        const resolvedOwner = req.user?.id || owner;

        if (!resolvedOwner) {
            return res.status(400).json({
                message: "Owner es obligatorio"
            });
        }

        const moto = await Moto.create({
            owner: resolvedOwner,
            brand,
            model,
            photoUrl,
            year,
            displacementCc,
            plate,
            color
        });

        res.status(201).json(moto);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error al crear moto",
            error: err.message
        });
    }
}



module.exports = {
    addMoto,
    getAllMotos,
    createMoto,
    getMyMotos,
    getMotoById,
    updateMoto,
    deleteMoto
};
