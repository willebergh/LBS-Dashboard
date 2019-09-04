const express = require("express");
const router = express.Router();
const Forecast = require("../../models/Forecast");
const logger = require("../../logger");

router.get("/:city", (req, res) => {
    const city = req.params.city;
    Forecast.findOne({ city })
        .select("-_id -__v")
        .then(forecast => res.status(200).json(forecast))
        .catch(err => logger.error(err, "/api/weather"))
});

module.exports = router;