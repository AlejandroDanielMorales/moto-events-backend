const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true 
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    motoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Moto' 
    }, // opcional

    withCompanion: { 
        type: Boolean, 
        default: false 
    },

    companionName: { 
        type: String,
        trim: true
    },

    joinedAt: { 
        type: Date, 
        default: Date.now 
    },

    status: { 
        type: String, 
        enum: ['inscripto', 'confirmado', 'cancelado'], 
        default: 'inscripto' 
    },

    notes: String
});

// Validación: si va con acompañante, el nombre es obligatorio
RegistrationSchema.pre('save', function (next) {
    if (this.withCompanion && !this.companionName) {
        return next(new Error('El nombre del acompañante es obligatorio'));
    }
    next();
});

// Evitar duplicados
RegistrationSchema.index(
    { eventId: 1, userId: 1 },
    { unique: true }
);

module.exports = mongoose.model('Registration', RegistrationSchema);
