const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MotoSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    photoUrl: String,
    year: Number,
    displacementCc: Number,       // cilindrada
    plate: String,
    color: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Moto", MotoSchema);
