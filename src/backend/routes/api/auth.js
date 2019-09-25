const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");
const bcrypt = require("bcrypt");
const DeploymentConfig = require("../../models/DeploymentConfig");
const User = require("../../models/User");
require("dotenv").config();

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.status(200).json({ msg: "success" });
    })
});

router.post("/refresh-token", (req, res) => {
    const { refreshToken, key, dashboardName, deploymentName } = req.body.config;

    DeploymentConfig.findOne({ key })
        .then(config => {
            if (!config) {
                return res.json({ msg: "invalid-key" })
            } else {
                const token = jwt.sign({ key, dashboardName, deploymentName }, process.env.JWT_SECRET, { expiresIn: 20 });
                const newRefreshToken = randToken.uid(256);

                const newArr = config.connectedDashboards.map(cd => {
                    if (cd.refreshToken === refreshToken) {
                        return { ...cd, refreshToken: newRefreshToken };
                    } else {
                        return cd
                    }
                })
                config.connectedDashboards = newArr;
                config.save()
                    .then(() => {
                        const { name: deploymentName, restaurant, station, weather } = config;
                        const data = { key, dashboardName, deploymentName, restaurant, station, weather, token, refreshToken };
                        return res.json({ msg: "success", config: data });
                    })
                    .catch(err => console.log(err));
            }
        })
});

router.get("/me", (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.json({ msg: "no-token" });
    } else {
        try {
            var decoded = jwt.verify(token, SECRET);
        } catch (err) {
            return res.json({ msg: "token-invalid", error: err.message });
        }
        return res.json(decoded);
    }
});


router.post("/login", (req, res) => {
    const { username, email, password, remember } = req.body;
    const identifier = username ? { username } : { email }
    User.findOne(identifier)
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    msg: "error",
                    error: {
                        type: "unauthorized",
                        msg: username ? "Wrong username or password" : "Wrong email or password"
                    }
                })
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: "error",
                        error: {
                            type: "unauthorized",
                            msg: username ? "Wrong username or password" : "Wrong email or password"
                        }
                    })
                } else {
                    try {
                        let payload = { user: { uid: user.uid, roles: user.roles } };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 10 });
                        res.cookie("token", token, { httpOnly: true });

                        req.session.user = { ...payload.user };

                        const refreshToken = remember ? randToken.uid(256) : undefined;
                        const { uid, username, email, fullName, roles, deployments } = user;
                        return res.status(200).json({
                            msg: "success", user: {
                                uid, username, email, fullName, roles, deployments, token, refreshToken
                            }
                        });

                    } catch (err) {
                        return res.status(200).json({
                            msg: "error",
                            error: {
                                type: "token",
                                msg: err.message
                            }
                        })
                    }
                }
            })
        })
});

router.post("/register", (req, res) => {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password) {
        return res.status(200).json({ msg: "empty-fields" });
    }

    User.findOne({ $or: [{ username }, { email }] })
        .then(user => {
            if (user) {
                if (user.username === username) {
                    return res.status(200).json({ msg: "username-taken" })
                } else {
                    return res.status(200).json({ msg: "email-taken" })
                }
            } else {

                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hashedPassword) => {

                        const uid = randToken.uid(32);
                        var newUser = new User({
                            uid, username, email, password: hashedPassword, fullName, roles: { "user": "user" }
                        });
                        newUser.save()
                            .then(() => {
                                const payload = { user: { uid, roles: { "user": "user" } } };
                                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 10 });
                                res.cookie("token", token, { httpOnly: true });

                                let user = { uid, username, email, fullName };
                                return res.status(200).json({ msg: "success", user: { ...user, token } });
                            })

                    });
                });


            }
        })
});

module.exports = router;