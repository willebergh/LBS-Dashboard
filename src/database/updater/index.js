const logger = require("../../logger");
const moment = require("moment");
require("dotenv").config();

const updateFoodMenu = require("./updateFoodMenu");
const updateForecast = require("./updateForecast");
const updateSLRealTime = require("./updateSLRealTime");

module.exports.init = function () {

    logger.log("Updater initialized", "Updater");

    setInterval(() => {
        const clock = moment().format("HH:mm:ss");
        update(clock)
    }, 1000)

}

function update(clock) {
    const h = clock.split(":")[0];
    const m = clock.split(":")[1];
    const s = clock.split(":")[2];

    // Once a day
    if (h === "00" && m === "00" && s === "00") {
        updateFoodMenu();
    }

    // Once an hour
    if (m === "00" && s === "00") {
        updateForecast();
    }

    // Once a minute
    if (s === "00") {
        logger.log("The time is: " + clock, "Clock");
        updateSLRealTime();
    }

}