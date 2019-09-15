const express = require("express");
const app = express();
const cors = require("cors");
const session = require("./config/session");

const logger = require("./logger");
const routes = require("./routes");
const database = require("./database");

app.use(express.json());
app.use(session)
app.use(routes);

database.init();

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    logger.success(`Server started on port ${PORT}.`, "Express")
})