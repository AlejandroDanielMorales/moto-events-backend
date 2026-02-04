const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MotoSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    displacementCc: { type: String, required: true },       // cilindrada
    plate: { type: String, required: true },
    color: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Moto", MotoSchema);
