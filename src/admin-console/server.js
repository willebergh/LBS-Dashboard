const express = require("express");
const app = express();

app.use(express.public("public"));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname + "public", "index.html"));
});

