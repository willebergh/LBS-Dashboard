const mongoose = require("mongoose");

const DeploymentConfigSchema = new mongoose.Schema({
    key: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    restaurant: {
        type: String,
    },
    station: {
        type: String
    },
    weather: {
        type: String
    },
    connectedDashboards: {
        type: Array
    }
});

module.exports = mongoose.model("deploymentConfig", DeploymentConfigSchema);