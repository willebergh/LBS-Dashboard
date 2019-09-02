const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const finder = require('findit')(__dirname);
const logger = require("../logger");

function addRoute(subDir, fileName, filePath) {
    router.use(`/${subDir}/${fileName}`, require(filePath));
    logger.log("Router", `Added route: /${subDir}/${fileName}`)
};

finder.on("directory", dir => {
    const base = path.basename(dir);
    if (base === "routes") return;

    const subDir = fs.readdirSync(path.join(__dirname, base));
    for (var i in subDir) {
        const fileName = path.basename(subDir[i], ".js");
        const filePath = path.join(dir, subDir[i]);
        addRoute(base, fileName, filePath)
    }
});

module.exports = router;