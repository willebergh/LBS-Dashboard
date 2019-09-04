const mongoose = require("mongoose");

const SLRealTimeSchema = new mongoose.Schema({
    SiteId: {
        type: String
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

module.exports = mongoose.model("SLRealTime", SLRealTimeSchema);