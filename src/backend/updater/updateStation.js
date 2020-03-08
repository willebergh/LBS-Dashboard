const axios = require("axios");
const logger = require("../logger");
const Station = require("../models/Station");
require("dotenv").config();

module.exports = async function (siteId, count, io) {
    try {

        if (!siteId) throw "Station siteId is required!";
        if (!io) throw "Websocket is required!";

        logger.loading(`Updating station ${siteId}#${count}...`, "Updater");

        const data = await getData(siteId);
        const station = await Station.findOne({ siteId });

        if (!station) {
            const newStation = new Station(data);
            await newStation.save();
        } else {
            station.overwrite(data);
            await station.save();
        }

        io.of("/dashboards").in(`station-${siteId}`).emit("update-station", data);
        logger.success(`Updated station ${siteId}#${count}`, "Updater");

    } catch (err) {
        if (typeof err === "string") {
            logger.error(err, "Updater", `Station ${siteId}#${count}`);
        } else {
            logger.error(err.message, "Updater", `Station ${siteId}#${count}`);
        }
    }
}

async function getData(siteId) {
    const token = process.env.SL_API_REALTIME_TOKEN;
    const url = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${token}&siteid=${siteId}`;
    const data = (await axios.get(url, { timeout: 25 * 1000 })).data.ResponseData;
    if (!data) throw "SL API: Request timed out";
    return { siteId, ...data };
}