const logger = require("../logger");
const NewDashboard = require("../models/NewDashboard");

module.exports.init = function (server) {
    const io = require("socket.io")(server);
    global.websocket = io;
    startWebsocket();
}

function startWebsocket() {
    const io = global.websocket;
    setTimeout(() => {

    }, 2000)
    io.on("connection", socket => {

        logger.success("New connection", "WebSocket", socket.id);

        socket.on("new-dashboard", code => onNewDashboard(socket, code));
        socket.on("dashboard-reconnect", data => onDashboardReconnect(socket, data));

        socket.on("disconnect", reason => onDisconnect(socket, reason));

    })
}

function onNewDashboard(socket, code) {
    const newDashboard = new NewDashboard({
        socketid: socket.id, code
    });
    newDashboard.save()
        .then(() => console.log("Saved " + code + " to the database"))
        .catch(err => console.log(err))
}

function onDashboardReconnect(socket, data) {
    const io = global.websocket;
    socket.join(data.key);
    socket.name = data.dashboardName;
    socket.key = data.key;

    io.in(data.key).clients((err, c) => {
        const connectedDashboards = [];
        c.forEach(c => {
            connectedDashboards.push(io.of("/").connected[c].name)
        })
        io.in(data.key).emit("update-connected-dashboards", connectedDashboards);
    })
}

function onDisconnect(socket, reason) {
    const io = global.websocket;
    io.in(socket.key).clients((err, c) => {
        const connectedDashboards = [];
        c.forEach(c => {
            connectedDashboards.push(io.of("/").connected[c].name)
        })
        io.in(socket.key).emit("update-connected-dashboards", connectedDashboards);
    })
    logger.loading(reason, "WebSocket", socket.id, "Disconnected");
    socket.disconnect();
}

module.exports.emitById = function (socketid, event, data) {
    return new Promise(async (resolve, reject) => {
        const io = global.websocket;
        await io.to(socketid).emit(event, data);
        resolve();
    });
}
