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
    }
});

module.exports = mongoose.model("user", UserSchema);