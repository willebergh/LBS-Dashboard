const mongoose = require("mongoose");
const logger = require("../logger");
const updater = require("./updater");
require("dotenv").config();

function init() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
        .then(() => {
            logger.log("Connected to database successfully", "MongoDB");
            updater.init()
        })
        .catch(err => {
            logger.error(err, "MongoDB");
        })
}

module.exports.init = init;