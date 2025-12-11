const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    motoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Moto' }, // opcional: con qué moto va
    joinedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['inscripto', 'confirmado', 'cancelado'], default: 'inscripto' },
    notes: String
});

// Evitar duplicados (un usuario solo una inscripción por evento)
RegistrationSchema.index({ eventId: 1, userId: 1 }, { unique: true });