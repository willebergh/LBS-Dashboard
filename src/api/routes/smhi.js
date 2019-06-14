const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/forecast", (req, res) => {
    axios.get("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18/lat/59/data.json")
        .then(response => res.status(200).json(response.data))
        .catch(err => res.status(400).json(err))
});

module.exports = router;