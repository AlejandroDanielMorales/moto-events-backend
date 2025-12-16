const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StopSchema = require("./Stop");

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

    // PUNTOS INTERMEDIOS Y FINAL
  stops: [{
    type: Schema.Types.ObjectId,
    ref: "Stop"
  }],
    status: { type: String, enum: ['activo', 'cancelado', 'finalizado'], default: 'activo' },
    createdAt: { type: Date, default: Date.now }
});

EventSchema.index({ startLocation: "2dsphere" });
EventSchema.index({ date: 1, status: 1 });

module.exports = mongoose.model("Event", EventSchema);
