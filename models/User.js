const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },

    password: { 
        type: String, 
        required: true 
    }, // hasheada

    role: { 
        type: String, 
        enum: ['admin','user'], 
        default: 'user' 
    },

    avatarUrl: String,

    phone: String,

    emergencyContact1: { 
        type: String, 
        required: true 
    },

    emergencyContact2: { 
        type: String 
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("User", UserSchema);

