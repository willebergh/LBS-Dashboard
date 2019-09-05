const express = require("express");
const app = express();
const cors = require("cors");

const logger = require("./src/logger");
const routes = require("./src/routes");
const database = require("./src/database");

app.use(express.json());
app.use(routes);

database.init();

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    logger.success(`Server started on port ${PORT}.`, "Express")
})