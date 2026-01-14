const jwt = require("jsonwebtoken");

 const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ error: "No token, acceso denegado" });

    try {
        console.log("AUTH HEADER:", req.headers.authorization);
console.log("TOKEN RAW:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();
    } catch (error) {
        console.error("JWT ERROR:", error);
        res.status(400).json({ error: "Token inválido", contentType: req.headers["content-type"] , headerAuth: req.headers.authorization });
    }
};
module.exports = { authMiddleware };
