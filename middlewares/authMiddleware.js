const jwt = require("jsonwebtoken");

 const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "No token, acceso denegado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();
    } catch (error) {
        res.status(400).json({ error: "Token inválido" });
    }
};
module.exports = { authMiddleware };
