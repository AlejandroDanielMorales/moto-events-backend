const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StopSchema = require("./Stop").schema; // Importamos el esquema de Stop

const EventSchema = new Schema({

    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    images: [String],

    startLocation: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true }
    },

    meetingAddress: String,
    departTime: { type: Date, required: true },
    returnTime: Date,

    // ⭐ PUNTOS INTERMEDIOS Y FINAL
    stops: [StopSchema],   // <-- acá tenés inicio, intermedios y final en orden

    status: { type: String, enum: ['activo', 'cancelado', 'finalizado'], default: 'activo' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

// Índices
EventSchema.index({ startLocation: '2dsphere' });
EventSchema.index({ date: 1, status: 1 });

module.exports = mongoose.model("Event", EventSchema);