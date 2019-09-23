const logger = require("../logger");

module.exports = function handleDashboardSocket(io, socket) {
    socket.on("dashboard-connect", onDashboardConnect);
    socket.on("disconnect", onDisconnect);

    function onDashboardConnect(data) {
        socket.join(`restaurant-${data.restaurants}`);
        socket.join(`station-${data.station}`);
        socket.join(`weather-${data.weather}`);
        socket.join(data.key);
        socket.name = data.dashboardName;
        socket.key = data.key;

        io.of("/dashboards").in(data.key).clients((err, c) => {
            const connectedDashboards = [];
            c.forEach(c => {
                connectedDashboards.push(io.of("/dashboards").connected[c].name)
            })
            io.of("/admin").in(data.key).emit("update-connected-dashboards", connectedDashboards);
        })
    }

    function onDisconnect(reason) {
        io.of("/dashboards").in(socket.key).clients((err, c) => {
            const connectedDashboards = [];
            c.forEach(c => {
                connectedDashboards.push(io.of("/dashboards").connected[c].name)
            })
            io.of("/admin").in(socket.key).emit("update-connected-dashboards", connectedDashboards);
        })
        logger.loading(reason, "WebSocket", socket.id, "Disconnected");
        socket.disconnect();
    }
}

