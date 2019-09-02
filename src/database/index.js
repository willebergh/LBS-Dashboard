const mongoose = require("mongoose");
const logger = require("../logger");
require("dotenv").config();

function init() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    })
        .then(() => {
            logger.log("MongoDB", "Connected to database successfully");
        })
        .catch(err => {
            logger.error("MongoDB", err);
        })
}

module.exports.init = init;