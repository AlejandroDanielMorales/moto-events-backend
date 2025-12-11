const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StopSchema = new Schema({
    name: String,
    description: String,
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true }
    },
    arrivalTime: Date,
    departureTime: Date
});

module.exports = StopSchema;
