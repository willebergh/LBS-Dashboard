const axios = require("axios");
const logger = require("../../logger");
const Forecast = require("../../models/Forecast");

function updateForecast() {
    logger.log("Updating forecasts...", "Database", "Updater");
    const apiKey = process.env.DARKSKY_APIKEY
    axios.get(`https://api.darksky.net/forecast/${apiKey}/59.2747,18.0333?units=si`)
        .then(res => {
            var forecast = new Forecast(res.data);
            forecast.save()
                .then(() => logger.log("Updated forecast", "Updater"))
                .catch(err => logger.error(err, "Updater"))
        })
        .catch(err => logger.error(err, "Updater"))
}

module.exports = updateForecast;