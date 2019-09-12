const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
    siteId: {
        type: String,
        required: true,
        unique: true
    },
    LatestUpdate: {
        type: String
    },
    DataAge: {
        type: Number
    },
    Metros: {
        type: Array
    },
    Buses: {
        type: Array
    },
    Trains: {
        type: Array
    },
    Trams: {
        type: Array
    },
    Ships: {
        type: Array
    },
    StopPointDeviations: {
        type: Array
    }
});

module.exports = mongoose.model("station", StationSchema);