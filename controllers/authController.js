const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      emergencyContact1,
      emergencyContact2
    } = req.body;

    // Validación mínima
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "Nombre, email y contraseña son obligatorios."
      });
    }

    if (!emergencyContact1) {
      return res.status(400).json({
        msg: "El primer número de emergencia es obligatorio"
      });
    }

    // Verificar email existente
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        msg: "El email ya está registrado."
      });
    }

    // Hash de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      emergencyContact1,
      emergencyContact2
    });

    return res.status(201).json({
      msg: "Usuario registrado correctamente",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Error en registro",
      error: err.message
    });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Clave incorrecta" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token, user });

  } catch (err) {
    return res.status(500).json({ msg: "Error en login", err });
  }
};

module.exports = {
  register,
  login
};
