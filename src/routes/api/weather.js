const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/new", (req, res) => {
    const apiKey = process.env.DARKSKY_APIKEY
    axios.get(`https://api.darksky.net/forecast/${apiKey}/59.2747,18.0333?units=si`)
        .then(response => res.status(200).json(response.data))
        .catch(err => res.status(400).json(err))
});

module.exports = router;