const logger = require("../logger");
const moment = require("moment");
const axios = require("axios");
require("dotenv").config();

const Forecast = require("../models/Forecast");

module.exports.init = function () {

    logger.log("Initialized", "Database", "Updater");

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
        updateSlRealTime();
    }

}

function updateFoodMenu() {
    logger.log("Updating food menu...", "Database", "Updater");
}

function updateForecast() {
    logger.log("Updating forecasts...", "Database", "Updater");
    const apiKey = process.env.DARKSKY_APIKEY
    axios.get(`https://api.darksky.net/forecast/${apiKey}/59.2747,18.0333?units=si`)
        .then(res => {
            var forecast = new Forecast(res.data);
            forecast.save()
                .then(() => logger.log("Updated forecast", "Database", "Updater"))
                .catch(err => logger.error(err, "Updater"))
        })
        .catch(err => logger.error(err, "Updater"))
}

function updateSlRealTime() {
    logger.log("Updating SL RealTime...", "Database", "Updater")
}