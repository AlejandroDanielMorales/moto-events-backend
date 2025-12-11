const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StopSchema = new Schema({
    name: String,                      // Ej: "YPF Luján"
    description: String,               // opcional
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } // [lon, lat]
    },
    arrivalTime: Date,                 // hora en que se espera llegar
    departureTime: Date                // hora en que se espera salir
});

module.exports = mongoose.model("Stop", StopSchema);