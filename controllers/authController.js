const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkEmail(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ exists: false });
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  return res.json({
    exists: !!user
  });
}


async function register(req, res) {
  try {
    const {
      name,
      email,
      password,
      phone,
      emergencyContact1,
      emergencyContact2,
      birthDate,
      sex
    } = req.body;

    if (!name || !email || !password || !emergencyContact1 || !birthDate || !sex) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
      emergencyContact1,
      emergencyContact2,
      birthDate,
      sex,
      image: req.file ? req.file.path : null
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
}

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
  login,
  checkEmail
};
