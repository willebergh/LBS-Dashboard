const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const DeploymentConfig = require("../../models/DeploymentConfig");
const mongoose = require("mongoose");

router.get("/:uid/getdeployments", async (req, res) => {
    const uid = req.params.uid;
    const user = await User.findOne({ uid });
    const deployments = user.deployments;

    const configs = [];

    DeploymentConfig.find({
        "key": {
            $in: deployments.map(deployment => { return deployment })
        }
    }, (err, configs) => {
        console.log(configs);
    })

    //res.status(200).json(configs)

})

module.exports = router;