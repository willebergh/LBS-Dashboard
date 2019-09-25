const express = require("express");
const router = express.Router();
const uuidv4 = require('uuid/v4');
const websocket = require("../../websocket");
const DeploymentConfig = require("../../models/DeploymentConfig");
const NewDashboard = require("../../models/NewDashboard");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");
require("dotenv").config();

router.post("/new", async (req, res) => {
    const user_uid = req.session.user.id;
    if (!user_uid) {
        return res.status(200).json({ msg: "unathorized" });
    } else {
        const { name, displayName, restaurant, station, weather } = req.body;
        const config = await DeploymentConfig.findOne({ name });
        if (config) {
            res.status(200).json({ msg: `Deployment already exists: ${name}` });
        } else {
            const key = uuidv4();
            var newConfig = new DeploymentConfig({
                key, name, displayName, restaurant, station, weather
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


                const user_uid = req.session.user.id;
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

                                            const token = jwt.sign({ key, dashboardName: name, deploymentName }, process.env.JWT_SECRET, { expiresIn: 20 });
                                            const refreshToken = randToken.uid(256);

                                            const data = { key, dashboardName: name, deploymentName, restaurant, station, weather, token, refreshToken };

                                            websocket.emitById("/new-dashboards", newDashboard.socketid, "new-dashboard-add", data)
                                                .then(() => {
                                                    newDashboard.delete();
                                                    config.connectedDashboards = [
                                                        ...config.connectedDashboards, { name, refreshToken }
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

router.post("/delete", (req, res) => {
    const { key, dashboardName } = req.body;
    const user_uid = req.session.user.id;
    User.findOne({ uid: user_uid })
        .then(user => {
            if (!user) {
                return res.status(200).json({ msg: "unathorized" })
            } else {
                const findUserKey = user.deployments.find(k => k === key);
                if (!findUserKey) {
                    return res.status(200).json({ msg: "unathorized" });
                } else {
                    DeploymentConfig.updateOne({ key },
                        {
                            "$pull":
                            {
                                "connectedDashboards":
                                    { "name": dashboardName }
                            }
                        }, { safe: true, multi: true }, (err, obj) => {
                            if (err) {
                                return res.json({ msg: "error", error: err })
                            } else {
                                return res.json({ msg: "success" });
                            }
                        });
                }
            }
        })
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

router.get("/get/:key/dashboards", (req, res) => {
    const { key, pageSize, pageNr } = req.params;
    DeploymentConfig.findOne({ key })
        .select("-_id -__v")
        .then(config => {
            if (!config) {
                return res.status(200).json({ msg: "config-not-found" });
            } else {
                const dashboards = config.connectedDashboards.map(cd => {
                    return { name: cd.name }
                })

                var dashboardPages = []
                for (var i = 0, p = 1; i < dashboards.length; i += parseInt(pageSize), p++) {
                    var temparray = dashboards.slice(i, i + parseInt(pageSize));
                    dashboardPages.push({ page: p, data: temparray, totalCount: dashboards.length });
                }

                const data = () => {
                    const page = dashboardPages.find(p => p.page === parseInt(pageNr));
                    return page ? page : {
                        data: [],
                        page: 0,
                        totalCount: 0
                    }
                }

                return res.status(200).json({ msg: "success", dashboards })
            }
        })
})

router.post("/update/:key", (req, res) => {
    const key = req.params.key;
    const newConfig = req.body;
    const user_uid = req.session.user.id;
    User.findOne({ uid: user_uid })
        .then(user => {
            if (!user) {
                return res.status(200).json({ msg: "unathorized" })
            } else {
                const findUserKey = user.deployments.find(k => k === key);
                if (!findUserKey) {
                    return res.status(200).json({ msg: "unathorized" });
                } else {
                    DeploymentConfig.updateOne({ key }, {
                        name: newConfig.name,
                        displayName: newConfig.displayName,
                        restaurant: newConfig.restaurant,
                        station: newConfig.station,
                        weather: newConfig.weather
                    }, {}, (err, updatedConfig) => {
                        if (err) throw err;
                        return res.status(200).json({ msg: "success", updatedConfig });
                    })
                }
            }
        })
})

module.exports = router;