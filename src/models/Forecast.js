const mongoose = require("mongoose");

const ForecastSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        unique: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    timeZone: {
        type: String
    },
    currently: {
        type: Object
    },
    hourly: {
        type: Object
    },
    daily: {
        type: Object
    },
    alerts: {
        type: Array
    },
    flags: {
        type: Object
    },
    offset: {
        type: Number
    }
});

module.exports = mongoose.model("forecast", ForecastSchema);