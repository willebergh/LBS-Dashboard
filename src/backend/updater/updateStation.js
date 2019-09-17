const axios = require("axios");
const logger = require("../logger");
const Station = require("../models/Station");
require("dotenv").config();

module.exports = async function (siteId, io) {
    if (!siteId) return;

    logger.log(`Updating station ${siteId}...`.yellow, "Updater");

    const data = await getData(siteId);
    const station = await Station.findOne({ siteId });

    if (!station) {
        const newStation = new Station(data)
        newStation.save()
            .then(() => logger.log(`Added station ${siteId} to the database`.green, "Updater"))
            .catch(err => logger.error(err, "Updater"))
    } else {
        await Station.deleteOne({ _id: station._id });
        const newStation = new Station(data);
        newStation.save()
            .then(() => {
                logger.log(`Updated station ${siteId}`.green, "Updater");
                io.in(`station-${siteId}`).emit("update-station", data);
            })
            .catch(err => logger.error(err, "Updater"))
    }
}

async function getData(siteId) {
    let data;

    const token = process.env.SL_API_REALTIME_TOKEN;
    const url = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${token}&siteid=${siteId}`;
    await axios.get(url)
        .then(res => data = { siteId, ...res.data.ResponseData })
        .catch(err => logger.error(err, "Updater"))

    return data;
}