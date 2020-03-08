const axios = require("axios");
const logger = require("../logger");
const Forecast = require("../models/Forecast");
require("dotenv").config();
const colors = require("colors");

module.exports = async function (city, count, io) {
    try {

        if (!city) throw "City name is required!";
        if (!io) throw "Websocket is required!";

        logger.log(`Updating forecast in ${city}#${count}`.yellow, "Updater");

        const data = await getData(city);
        const forecast = await Forecast.findOne({ city });

        if (!forecast) {
            const newForecast = new Forecast(data);
            await newForecast.save();
        } else {
            forecast.overwrite(data);
            await forecast.save();
        }

        io.of("/dashboards").in(`weather-${city}`).emit("update-weather", data)
        logger.log(`Updated the forecast in ${city}#${count}`.green, "Updater");

    } catch (err) {
        if (typeof err === "string") {
            logger.error(err, "Updater", `Forecast ${city}#${count}`);
        } else {
            logger.error(err.message, "Updater", `Forecast ${city}#${count}`);
        }
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