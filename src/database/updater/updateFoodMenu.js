const axios = require("axios");
const logger = require("../../logger");

function updateFoodMenu() {
    logger.log("Updating food menu...", "Updater");
}

module.exports = updateFoodMenu;