const mongoose = require("mongoose");

const NewDashboardSchema = new mongoose.Schema({
    socketid: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model("newDashboard", NewDashboardSchema);