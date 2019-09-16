const mongoose = require("mongoose");

const DeploymentConfigSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
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
    }
});

module.exports = mongoose.model("deploymentConfig", DeploymentConfigSchema);