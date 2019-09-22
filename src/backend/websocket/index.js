const logger = require("../logger");
const reqAuth = require("../middleware/reqAuth");

const dashboardSocket = require("./dashboardSocket");
const newDashboardSocket = require("./newDashboardSocket");



const Server = require('socket.io');
const Updater = require("../updater");
module.exports = class io extends Server {
    constructor(server) {
        super(server);
    }

    init() {
        const updater = new Updater(this);
        updater.init();

        this.handleNewDashboardSocket();
        this.handleDashboardSocket();
    }

    handleNewDashboardSocket() {
        this.of("/new-dashboards").on("connection", socket => {
            logger.success("New connection", "WebSocket", socket.id);
            newDashboardSocket(this, socket);
        })
    }

    handleDashboardSocket() {
        this.of("/dashboards").use(reqAuth.websocket).on("connection", socket => {
            logger.success("New connection", "WebSocket", socket.id);
            dashboardSocket(this, socket);
        })
    }

}


module.exports.emitById = function (namespace, socketId, event, data) {
    return new Promise(async (resolve, reject) => {
        const io = global.websocket;
        await io.of(namespace).to(socketId).emit(event, data);
        resolve();
    });
}