const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// @route   api/sl/realtime
// @desc    Get realtime data on departures
// @access  Public
router.get("/realtime/:siteid", (req, res) => {
    const token = process.env.SL_API_REALTIME_TOKEN;
    const siteid = req.params.siteid;
    const url = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${token}&siteid=${siteid}`;
    axios.get(url)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

module.exports = router;