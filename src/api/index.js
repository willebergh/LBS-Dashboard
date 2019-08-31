const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "routes");
const routes = fs.readdirSync(dir);

for (var i in routes) {
    const fileName = path.basename(routes[i], ".js");
    const filePath = path.join(dir, routes[i]);
    router.use(`/${fileName}`, require(filePath));
}

module.exports = router;