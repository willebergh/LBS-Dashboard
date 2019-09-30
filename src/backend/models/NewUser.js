const mongoose = require("mongoose");

const NewUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("newUser", NewUserSchema);