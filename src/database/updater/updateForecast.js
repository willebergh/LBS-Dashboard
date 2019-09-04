const axios = require("axios");
const logger = require("../../logger");
const Forecast = require("../../models/Forecast");
require("dotenv").config();

module.exports = async function (city) {
    if (!city) return;

    logger.log("Updating forecasts...", "Database", "Updater");

    const data = await getData(city);
    const forecast = await Forecast.findOne({ city });

    if (!forecast) {
        const newForecast = new Forecast(data);
        newForecast.save()
            .then(() => logger.log(`Added a new forecast from ${city} to the database`, "Updater"))
            .catch(err => logger.error(err, "Updater"))
    } else {
        await Forecast.deleteOne({ city });
        const newForecast = new Forecast(data);
        newForecast.save()
            .then(() => logger.log(`Updated the forecast in ${city}`, "Updater"))
            .catch(err => logger.error(err, "Updater"))
    }
}

async function getData(city) {
    switch (city) {
        case "stockholm": return await getDataStockholm();
    }
}


async function getDataStockholm() {
    let data;
    const apiKey = process.env.DARKSKY_APIKEY
    await axios.get(`https://api.darksky.net/forecast/${apiKey}/59.2747,18.0333?units=si`)
        .then(res => data = { city: "stockholm", ...res.data })
        .catch(err => logger.error(err, "Updater"))
    return data;
}