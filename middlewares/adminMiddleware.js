const adminMiddleware = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Acceso denegado: solo admin" });
    }
    next();
};
module.exports = {adminMiddleware};
