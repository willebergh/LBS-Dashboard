const express = require("express");
const router = express.Router();
const uuidv4 = require('uuid/v4');
const websocket = require("../../websocket");
const DeploymentConfig = require("../../models/DeploymentConfig");
const NewDashboard = require("../../models/NewDashboard");

router.post("/new", async (req, res) => {
    const { users, name, restaurant, station, weather } = req.body;
    const config = await DeploymentConfig.findOne({ name });

    if (config) {
        res.status(200).json({ msg: `Deployment already exists: ${name}` });
    } else {
        const key = uuidv4();
        var newConfig = new DeploymentConfig({
            admins: users, key, name, restaurant, station, weather
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
    const { code, key, name, user } = req.body;
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
                            const { name: deploymentName, restaurant, station, weather, admins } = config;
                            const admin = admins.find(admin => admin.uid === user.uid);
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

module.exports = router;