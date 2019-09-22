const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    deployments: {
        type: Array
    },
    refreshToken: {
        type: String
    }
});

module.exports = mongoose.model("user", UserSchema);