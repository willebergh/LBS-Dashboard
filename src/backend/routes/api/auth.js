const express = require("express");
const router = express.Router();
const admin = require("../../config/firebase-admin");
const jwt = require("jsonwebtoken");
const randToken = require("rand-token");
const DeploymentConfig = require("../../models/DeploymentConfig");
require("dotenv").config();

router.post("/login", (req, res) => {
    const idToken = req.body.idToken;
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.session.user_uid = decodedToken.uid;
            req.session.save(err => {
                if (err) throw err;
                res.status(200).json({ msg: "success" })
            })
        })
        .catch(err => {
            res.send(err)
        });
});

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.status(200).json({ msg: "success" });
    })
});

router.post("/refresh-token", (req, res) => {
    const { refreshToken, key, name } = req.body.config;

    DeploymentConfig.findOne({ key })
        .then(config => {
            if (!config) {
                return res.json({ msg: "invalid-key" })
            } else {
                const token = jwt.sign({ key, name }, process.env.JWT_SECRET, { expiresIn: 20 });
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
                        const data = { key, dashboardName: name, deploymentName, restaurant, station, weather, token, refreshToken };
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

module.exports = router;