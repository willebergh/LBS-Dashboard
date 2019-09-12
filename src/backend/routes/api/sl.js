const express = require("express");
const router = express.Router();
const Station = require("../../models/Station");
const logger = require("../../logger");

router.get("/realtime/:siteId", (req, res) => {
    const siteId = req.params.siteId;
    Station.findOne({ siteId })
        .select("-_id -__v")
        .then(station => res.status(200).json(station))
        .catch(err => logger.error(err, "/api/sl/realtime"))
});

module.exports = router;