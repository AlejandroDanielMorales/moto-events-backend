const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, avatarUrl } = req.body;

    // Validación mínima
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Nombre, email y contraseña son obligatorios." });
    }

    // Verificar si ya existe el email
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "El email ya está registrado." });

    // Hash de la contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password: hashed,
      phone: phone || null,
      avatarUrl: avatarUrl || null,
      role: "user"   // se fuerza por seguridad
    });

    return res.json({ msg: "Usuario registrado", user });

  } catch (err) {
    return res.status(500).json({ msg: "Error en registro", err });
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
