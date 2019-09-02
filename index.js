const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./src/logger");

const database = require("./src/database");
database.init();

app.use(express.json());
app.use(cors({
    "Access-Control-Allow-Origin": "*"
}))

const routes = require("./src/routes");
app.use(routes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    logger.log("Express", `Server started on port ${PORT}.`)
})