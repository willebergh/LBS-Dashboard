const logger = require("../logger");
const NewDashboard = require("../models/NewDashboard");

module.exports.emitById = function (socketid, event, data) {
    return new Promise(async (resolve, reject) => {
        const io = global.websocket;
        await io.to(socketid).emit(event, data);
        resolve();
    });
}

const Server = require('socket.io');
const Updater = require("../updater");
module.exports = class io extends Server {
    constructor(server) {
        super(server);
    }

    init() {
        const updater = new Updater(this);
        updater.init();
        this.on("connection", socket => {
            logger.success("New connection", "WebSocket", socket.id);
            handleSocket(this, socket);
        })
    }

}

function handleSocket(io, socket) {
    socket.on("new-dashboard", onNewDashboard);
    socket.on("dashboard-connect", onDashboardConnect);
    socket.on("disconnect", onDisconnect);

    function onNewDashboard(code) {
        const newDashboard = new NewDashboard({
            socketid: socket.id, code
        });
        newDashboard.save()
            .then(() => console.log("Saved " + code + " to the database"))
            .catch(err => console.log(err))
    }

    function onDashboardConnect(data) {
        socket.join(`restaurant-${data.restaurants}`);
        socket.join(`station-${data.station}`);
        socket.join(`weather-${data.weather}`);
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

    function onDisconnect(reason) {
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
}

module.exports.emitById = function (socketid, event, data) {
    return new Promise(async (resolve, reject) => {
        const io = global.websocket;
        await io.to(socketid).emit(event, data);
        resolve();
    });
}
