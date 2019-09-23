const logger = require("../logger");

module.exports = function adminSocket(io, socket) {
    socket.on("admin-connect", onAdminConnect);
    socket.on("get-connected-dashboards", onGetConnectedDashboards)
    socket.on("identify-dashboard", onIdentifyDashboard);
    socket.on("delete-dashboard", onDeleteDashboard);

    function onAdminConnect(data) {
        socket.join(data.key);
    }

    function onGetConnectedDashboards(data) {
        io.of("/dashboards").in(data.key).clients((err, c) => {
            const connectedDashboards = [];
            c.forEach(c => {
                connectedDashboards.push(io.of("/dashboards").connected[c].name)
            })
            io.of("/admin").in(data.key).emit("update-connected-dashboards", connectedDashboards);
        })
    }

    function onIdentifyDashboard(data) {
        io.of("/dashboards").in(data.key).clients(async (err, c) => {
            const connectedDashboards = [];
            await c.forEach(c => {
                connectedDashboards.push({ socketId: c, name: io.of("/dashboards").connected[c].name })
            })
            const identified = connectedDashboards.find(cd => cd.name === data.name);
            io.of("/dashboards").to(identified.socketId).emit("dashboard-identified")
        })
    }

    function onDeleteDashboard(data) {
        io.of("/dashboards").in(data.key).clients(async (err, c) => {
            const connectedDashboards = [];
            await c.forEach(c => {
                connectedDashboards.push({ socketId: c, name: io.of("/dashboards").connected[c].name })
            })
            const identified = connectedDashboards.find(cd => cd.name === data.name);
            io.of("/dashboards").to(identified.socketId).emit("dashboard-delete");
        })
    }
}