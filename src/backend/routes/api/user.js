const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const DeploymentConfig = require("../../models/DeploymentConfig");
const mongoose = require("mongoose");

router.get("/get-deployments", async (req, res) => {
    const uid = req.session.user_uid;
    const user = await User.findOne({ uid });

    try {
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


})

module.exports = router;