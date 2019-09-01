const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:lon/:lat", async (req, res) => {
    const { lon, lat } = req.params;
    const timeSeries = [];
    await axios.get(`https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)
        .then(response => {
            response.data.timeSeries.reverse().forEach(time => {
                timeSeries.push(time)
            })
        });
    await axios.get(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)
        .then(response => {
            response.data.timeSeries.forEach(time => {
                timeSeries.push(time)
            })
        });
    res.status(200).json(timeSeries)
});

router.get("/forecast", (req, res) => {
    axios.get("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.06263/lat/59.32946/data.json")
        .then(response => res.status(200).json(response.data))
        .catch(err => res.status(400).json(err))
});

router.get("/current", (req, res) => {
    axios.get("https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/point/lon/18.06263/lat/59.32946/data.json")
        .then(response => res.status(200).json(response.data))
        .catch(err => res.status(400).json(err))
});

router.get("/test2", async (req, res) => {

    const timeSeries = [];

    await axios.get("https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/point/lon/18.06263/lat/59.32946/data.json")
        .then(response => {
            response.data.timeSeries.reverse().forEach(time => {
                timeSeries.push(time.validTime)
            })
        });

    await axios.get("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.06263/lat/59.32946/data.json")
        .then(response => {

            response.data.timeSeries.forEach(time => {
                timeSeries.push(time.validTime)
            })


            res.status(200).json(timeSeries)

        });

});

module.exports = router;