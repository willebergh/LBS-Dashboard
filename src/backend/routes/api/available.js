const express = require("express");
const router = express.Router();


const available = {
    restaurants: [
        { id: "jonsjacob", name: "Jöns Jacob" }
    ],
    stations: [
        { id: "3404", name: "Karolinska institutet västra" },
    ],
    weathers: [
        { id: "stockholm", name: "Stockholm" }
    ],
}

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