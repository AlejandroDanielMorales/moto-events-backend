require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");
const stopRoutes = require("./routes/stopRoutes");
const authRoutes = require("./routes/authRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const motoRoutes = require("./routes/motoRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/upload.routes");

const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());


// Conexión a Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// Rutas
app.use("/api/events", eventRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/motos", motoRoutes);
app.use("/api/uploads", uploadRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Servidor en puerto " + PORT));
