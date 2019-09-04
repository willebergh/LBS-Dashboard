const axios = require("axios");
const logger = require("../../logger");

function updateSlRealTime() {
    logger.log("Updating SL RealTime...", "Updater")
}

module.exports = updateSlRealTime;