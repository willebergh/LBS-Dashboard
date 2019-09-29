const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String
    },
    roles: {
        type: Object,
        required: true
    },
    deployments: {
        type: Array
    },
    refreshToken: {
        type: String
    },
    avatarUrl: {
        type: String,
    }
});

module.exports = mongoose.model("user", UserSchema);