const express = require("express");
const router = express.Router();
const uuidv4 = require('uuid/v4');
const websocket = require("../../websocket");
const DeploymentConfig = require("../../models/DeploymentConfig");
const NewDashboard = require("../../models/NewDashboard");

router.post("/new", async (req, res) => {
    const { owner, name, restaurant, station, weather } = req.body;
    const config = await DeploymentConfig.findOne({ name });

    if (config) {
        res.status(200).json({ msg: `Deployment already exists: ${name}` });
    } else {
        const key = uuidv4();
        var newConfig = new DeploymentConfig({
            owner, key, name, restaurant, station, weather
        });
        newConfig.save()
            .then(() => {
                res.status(200).json({ msg: "success", key });
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
});

router.post("/add", async (req, res) => {
    const { code, key, name, owner } = req.body;
    NewDashboard.findOne({ code })
        .then(newDashboard => {
            if (!newDashboard) {
                return res.status(200).json({ msg: "invalid-code" });
            } else {
                DeploymentConfig.findOne({ key })
                    .then(config => {
                        if (!config) {
                            return res.status(200).json({ msg: "invalid-key" });
                        } else {
                            const { name: deploymentName, restaurant, station, weather } = config;
                            const isOwner = config.owner === owner;
                            if (!admin) {
                                return res.status(200).json({ msg: "unauthorized" });
                            } else {
                                const data = { key, dashboardName: name, deploymentName, restaurant, station, weather };
                                websocket.emitById(newDashboard.socketid, "new-dashboard-add", data)
                                    .then(() => {
                                        newDashboard.delete()
                                            .then(() => {
                                                res.status(200).json({ msg: "success" });
                                            });
                                    })
                                    .catch(err => {
                                        return res.status(200).json(err);
                                    })
                            }
                        }
                    })
            }
        });
});

router.get("/get-all/:uid", (req, res) => {
    const owner = req.params.uid;
    DeploymentConfig.findOne({ owner })
        .then(config => {
            if (!config) {
                return res.status(200).json({ msg: "configs-not-found" });

            }
        })
});

module.exports = router;