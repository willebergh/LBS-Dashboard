const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("./websocket")
const cors = require("cors");
const session = require("./config/session");

const logger = require("./logger");
const routes = require("./routes");
const database = require("./database");
const Updater = require("./updater");

app.use(express.json());
app.use(session)
app.use(routes);

database.init();
const webSocket = new WebSocket(server);
global.websocket = webSocket;
webSocket.init();


const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    logger.success(`Server started on port ${PORT}.`, "Express")
})