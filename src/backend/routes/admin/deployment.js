const express = require("express");
const router = express.Router();
const uuidv4 = require('uuid/v4');
const websocket = require("../../websocket");
const DeploymentConfig = require("../../models/DeploymentConfig");
const NewDashboard = require("../../models/NewDashboard");
const User = require("../../models/User");

router.post("/new", async (req, res) => {
    const user_uid = req.session.user_uid;
    if (!user_uid) {
        return res.status(200).json({ msg: "unathorized" });
    } else {
        const { name, restaurant, station, weather } = req.body;
        const config = await DeploymentConfig.findOne({ name });
        if (config) {
            res.status(200).json({ msg: `Deployment already exists: ${name}` });
        } else {
            const key = uuidv4();
            var newConfig = new DeploymentConfig({
                key, name, restaurant, station, weather
            });
            const user = await User.findOne({ uid: user_uid });
            user.deployments = [...user.deployments, key];
            user.save()
                .then(() => {
                    newConfig.save()
                        .then(() => {
                            res.status(200).json({ msg: "success", key });
                        })
                        .catch(err => {
                            res.status(500).json(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
});

router.post("/add", async (req, res) => {
    const { code, key, name } = req.body;
    NewDashboard.findOne({ code })
        .then(newDashboard => {
            if (!newDashboard) {
                return res.status(200).json({ msg: "invalid-code" });
            } else {


                const user_uid = req.session.user_uid;
                User.findOne({ uid: user_uid })
                    .then(user => {

                        if (!user) {
                            return res.status(200).json({ msg: "unathorized" })
                        } else {


                            const findUserKey = user.deployments.find(k => k === key);
                            if (!findUserKey) {
                                return res.status(200).json({ msg: "unathorized" });
                            } else {


                                DeploymentConfig.findOne({ key })
                                    .then(config => {
                                        if (!config) {
                                            return res.status(200).json({ msg: "invalid-key" });
                                        } else {
                                            const { name: deploymentName, restaurant, station, weather } = config;
                                            const data = { key, dashboardName: name, deploymentName, restaurant, station, weather };

                                            websocket.emitById(newDashboard.socketid, "new-dashboard-add", data)
                                                .then(() => {
                                                    newDashboard.delete();
                                                    config.connectedDashboards = [
                                                        ...config.connectedDashboards, name
                                                    ]
                                                    config.save()
                                                        .then(() => {
                                                            res.status(200).json({ msg: "success" });
                                                        })
                                                        .catch(err => {
                                                            return res.status(200).json(err);
                                                        })
                                                })
                                                .catch(err => {
                                                    return res.status(200).json(err);
                                                })
                                        }
                                    })
                            }
                        }
                    })
            }
        });
});

router.get("/get/:key", (req, res) => {
    const key = req.params.key;
    DeploymentConfig.findOne({ key })
        .select("-_id -__v")
        .then(config => {
            if (!config) {
                return res.status(200).json({ msg: "config-not-found" });
            } else {
                return res.status(200).json({ msg: "success", deployment: config })
            }
        })
});

module.exports = router;