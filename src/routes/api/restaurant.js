const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");
const logger = require("../../logger");

router.get("/:name", (req, res) => {
    const name = req.params.name;
    Restaurant.findOne({ name })
        .select("-_id -__v")
        .then(restaurant => res.status(200).json(restaurant))
        .catch(err => logger.error(err, "/api/restaurant"))
});

module.exports = router;