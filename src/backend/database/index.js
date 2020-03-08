const mongoose = require("mongoose");
const logger = require("../logger");
require("dotenv").config();

function init() {
    mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
        .then(() => {
            logger.success("Connected to database successfully", "MongoDB");
        })
        .catch(err => {
            logger.error(err, "MongoDB");
        })
}

module.exports.init = init;