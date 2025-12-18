const User = require("../models/User");

// Obtener perfil propio
async function getMyProfile(req, res) {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener tu perfil" });
    }
}

// Actualizar perfil propio
async function updateMyProfile(req, res) {
    try {
        const allowedFields = [
            "name",
            "phone",
            "avatarUrl",
            "emergencyContact1",
            "emergencyContact2",
            "birthDate",
            "sex"
        ];

        const data = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                data[field] = req.body[field];
            }
        });

        // Validación emergency contact
        if ("emergencyContact1" in data && !data.emergencyContact1) {
            return res.status(400).json({
                message: "El primer número de emergencia es obligatorio"
            });
        }

        // Validación sexo
        if ("sex" in data && !["M", "F", "X"].includes(data.sex)) {
            return res.status(400).json({
                message: "El sexo debe ser M, F o X"
            });
        }

        // Validación fecha de nacimiento
        if ("birthDate" in data) {
            const date = new Date(data.birthDate);
            if (isNaN(date.getTime())) {
                return res.status(400).json({
                    message: "Fecha de nacimiento inválida"
                });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: data },
            { new: true }
        ).select("-password");

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el perfil" });
    }
}

// Obtener perfil de otro usuario por ID
async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error al buscar usuario" });
    }
}

// Eliminar cuenta propia
async function deleteMyAccount(req, res) {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: "Cuenta eliminada correctamente" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar la cuenta" });
    }
}

// Obtener todos los usuarios (admin)
async function getAllUsers(req, res) {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
}

// Eliminar usuario por ID (admin)
async function deleteUserById(req, res) {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
}

module.exports = {
    getMyProfile,
    updateMyProfile,
    getUserById,
    deleteMyAccount,
    getAllUsers,
    deleteUserById
};
