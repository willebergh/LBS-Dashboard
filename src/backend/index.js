const express = require("express");
const app = express();
const server = require("http").createServer(app);
const websocket = require("./websocket")
const cors = require("cors");
const session = require("./config/session");

const logger = require("./logger");
const routes = require("./routes");
const database = require("./database");

app.use(express.json());
app.use(session)
app.use(routes);

database.init();
websocket.init(server);

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    logger.success(`Server started on port ${PORT}.`, "Express")
})