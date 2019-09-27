const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const DeploymentConfig = require("../../models/DeploymentConfig");
const mongoose = require("mongoose");
const reqAuth = require("../../middleware/reqAuth");

router.get("/get-deployments", async (req, res) => {
    try {
        const uid = req.session.user.uid;
        const user = await User.findOne({ uid });
        await DeploymentConfig.find({
            "key": {
                $in: user.deployments.map(deployment => { return deployment })
            }
        }, (err, deployments) => {
            return res.status(200).json({ msg: "success", deployments })
        })
    } catch (err) {
        return res.status(200).json({ msg: "deployments-not-found", deployments: [] })
    }


});

router.get("/me", reqAuth.jwt, (req, res) => {
    const uid = res.locals.user.uid;
    User.findOne({ uid })
        .select("-_id -__v -password")
        .then(user => {
            return res.status(200).json({ msg: "success", user })
        })
});

module.exports = router;