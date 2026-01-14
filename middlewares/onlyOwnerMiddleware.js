// middleware/auth.js
const jwt = require("jsonwebtoken");
const onlyOwnerMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role, ... }
        next();
    } catch (err) {

        res.status(401).json({ message: `${token}` });
    }
};
module.exports = { onlyOwnerMiddleware };

