const express = require("express");
const app = express();
const port = process.env.PORT || 8080

app.use(express.public("public"));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname + "public", "index.html"));
});

app.listen(port, () => {
    console.log(`Serving admin-console on port ${port}`)
})

