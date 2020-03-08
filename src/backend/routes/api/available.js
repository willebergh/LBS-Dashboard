const express = require("express");
const router = express.Router();
const available = require("../../dataSources");

router.get("/restaurants", (req, res) => {
    res.json({ msg: "success", available: { restaurants: available.restaurants } })
});

router.get("/stations", (req, res) => {
    res.json({ msg: "success", available: { stations: available.stations } })
});

router.get("/weathers", (req, res) => {
    res.json({ msg: "success", available: { weathers: available.weathers } })
});

router.get("/all", (req, res) => {
    res.json({ msg: "success", available })
});


module.exports = router;