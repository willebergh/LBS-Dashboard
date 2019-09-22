const logger = require("../logger");

module.exports = function handleDashboardSocket(io, socket) {
    socket.on("dashboard-connect", onDashboardConnect);
    socket.on("identify-dashboard", onIdentifyDashboard)
    socket.on("disconnect", onDisconnect);

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

    function onIdentifyDashboard(data) {
        io.in(data.key).clients(async (err, c) => {
            const connectedDashboards = [];
            await c.forEach(c => {
                connectedDashboards.push({ socketId: c, name: io.of("/").connected[c].name })
            })
            const identified = connectedDashboards.find(cd => cd.name === data.name);
            io.to(identified.socketId).emit("dashboard-identified")
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

