const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");
const bcrypt = require("bcrypt");
const DeploymentConfig = require("../../models/DeploymentConfig");
const User = require("../../models/User");
const NewUser = require("../../models/NewUser");
const reqAuth = require("../../middleware/reqAuth");
const mailer = require("../../mailer");
require("dotenv").config();

router.post("/logout", (req, res) => {
    res.clearCookie("token");
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
                        let payload = { user: { uid: user.uid, roles: user.roles, deployments: user.deployments } };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 10 });
                        res.cookie("token", token, { httpOnly: true });

                        req.session.user = { ...payload.user };

                        const refreshToken = remember ? randToken.uid(256) : undefined;
                        const { uid, username, email, fullName, roles, deployments, avatarUrl } = user;
                        return res.status(200).json({
                            msg: "success", user: {
                                uid, username, email, fullName, roles, deployments, token, refreshToken, avatarUrl
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

router.post("/new-user", reqAuth.jwt, (req, res) => {
    if (res.locals.user.roles.user === "admin") {

        const { email } = req.body;
        User.findOne({ email })
            .then(user => {
                if (user) {
                    return res.status(200).json({ msg: "email-taken" })
                } else {
                    NewUser.findOne({ email })
                        .then(user => {
                            if (user) {
                                return res.status(200).json({ msg: "email-taken" })
                            } else {
                                const token = jwt.sign({ type: "newUser", data: email }, process.env.JWT_SECRET);
                                const newUser = new NewUser({ email, token });
                                newUser.save()
                                    .then(() => {
                                        const link = `http://localhost:3000/register/${token}`;
                                        mailer.sendMail(email, "newUser", { link })
                                            .then(info => {
                                                return res.status(200).json({ msg: "success", info });
                                            })
                                            .catch(err => {
                                                return res.status(200).json({ err });
                                            })
                                    })
                                    .catch(err => {
                                        return res.status(200).json({ err });
                                    })
                            }
                        })
                }
            })
    } else {
        return res.status(401).json({ msg: "unathorized" })
    }
});

router.get("/new-user/:token", async (req, res) => {
    const { token } = req.params;
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.type !== "newUser") throw "invalid-token-type";
    } catch (err) {
        return res.status(401).json({ msg: "error", error: err })
    }
    return res.status(200).json({ msg: "success", user: { email: decoded.data } });
});

router.post("/register/:token", async (req, res) => {
    const { username, password, fullName } = req.body;
    const { token } = req.params;

    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.type !== "newUser") throw "invalid-type";
    } catch (err) {
        return res.status(401).json({ msg: "unathorized", error: err });
    }

    const email = decoded.data;
    if (!username || !password) {
        return res.status(200).json({ msg: "empty-fields" });
    }

    NewUser.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ msg: "token-used" });
            } else {
                User.findOne({ username })
                    .then(user => {
                        if (user) {
                            return res.status(200).json({ msg: "username-taken" });
                        } else {
                            NewUser.findOneAndDelete({ email })
                                .then(user => {
                                    if (user) {
                                        const saltRounds = 10;
                                        bcrypt.genSalt(saltRounds, (err, salt) => {
                                            bcrypt.hash(password, salt, (err, hashedPassword) => {
                                                genUserAvatar(fullName, avatarUrl => {
                                                    const uid = randToken.uid(32);
                                                    var newUser = new User({
                                                        uid, username, email, password: hashedPassword, fullName, roles: { "user": "user" }, avatarUrl: avatarUrl
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
                                        });
                                    } else {
                                        return res.status(401).json({ msg: "token-used" });
                                    }
                                })
                        }
                    })
            }
        })
});

async function genUserAvatar(fullName, callback) {
    let color = "";
    for (var i = 0, letters = "0123456789ABCDEF"; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    var avatarUrl = "https://ui-avatars.com/api/?uppercase=true&size=128&color=fff"
    avatarUrl += `&name=${fullName.replace(/ /g, "+")}`
    avatarUrl += `&background=${color}`
    callback(avatarUrl);
}

module.exports = router;