const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const DeploymentConfig = require("../../models/DeploymentConfig");
const mongoose = require("mongoose");

router.get("/get-deployments", async (req, res) => {
    const uid = req.session.user_uid;
    const user = await User.findOne({ uid });
    const deployments = user.deployments;

    DeploymentConfig.find({
        "key": {
            $in: deployments.map(deployment => { return deployment })
        }
    }, (err, configs) => {
        res.status(200).json(configs)
    })
})

module.exports = router;