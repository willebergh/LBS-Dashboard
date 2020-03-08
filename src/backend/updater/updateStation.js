const axios = require("axios");
const logger = require("../logger");
const Station = require("../models/Station");
require("dotenv").config();

module.exports = async function (siteId, io) {
    try {

        if (!siteId) throw "Station siteId is required!";
        if (!io) throw "Websocket is required!";

        logger.log(`Updating station ${siteId}...`.yellow, "Updater");

        const data = await getData(siteId);
        const station = await Station.findOne({ siteId });

        if (!station) {
            const newStation = new Station(data)
            await newStation.save();
        } else {
            station.overwrite(data);
            await station.save();
        }

        io.of("/dashboards").in(`station-${siteId}`).emit("update-station", data);
        logger.log(`Updated station ${siteId}`.green, "Updater");

    } catch (err) {
        logger.error(err, "Updater", "Station:" + siteId)
    }
}

async function getData(siteId) {
    try {
        const token = process.env.SL_API_REALTIME_TOKEN;
        const url = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${token}&siteid=${siteId}`;
        const data = (await axios.get(url)).data.ResponseData;
        if (!data) return;
        return { siteId, ...data };
    } catch (err) {
        logger.error(err, "Updater")
    }
}