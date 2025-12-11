const User = require("../models/User");

// Obtener perfil propio


async function getMyProfile (req, res){
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener tu perfil" });
    }
};

// Actualizar perfil propio
async function updateMyProfile(req, res){
    try {
        const allowedFields = ["name", "phone", "avatarUrl"];
        const data = {};

        // Filtramos solo campos permitidos
        allowedFields.forEach((field) => {
            if (req.body[field]) data[field] = req.body[field];
        });

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: data },
            { new: true }
        ).select("-password");

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el perfil" });
    }
};

// Obtener perfil de otro usuario por ID
async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.userId).select("-password");
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error al buscar usuario" });
    }
};

// (Opcional) Eliminar la cuenta del usuario autenticado
async function  deleteMyAccount (req, res){
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: "Cuenta eliminada correctamente" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar la cuenta" });
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,
    getUserById,
    deleteMyAccount
};
