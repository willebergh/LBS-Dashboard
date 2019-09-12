const mongoose = require("mongoose");
const logger = require("../logger");
const Updater = require("./updater");
require("dotenv").config();

function init() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
        .then(() => {
            logger.success("Connected to database successfully", "MongoDB");
            const updater = new Updater();
            updater.init();
        })
        .catch(err => {
            logger.error(err, "MongoDB");
        })
}

module.exports.init = init;