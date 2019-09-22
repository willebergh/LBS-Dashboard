const NewDashboard = require("../models/NewDashboard");

module.exports = function newDashboardSocket(io, socket) {
    socket.on("new-dashboard", onNewDashboard);
    socket.on("disconnect", onDisconnect);

    function onNewDashboard(code) {
        const newDashboard = new NewDashboard({
            socketid: socket.id, code
        });
        newDashboard.save()
            .then(() => console.log("Saved " + code + " to the database"))
            .catch(err => console.log(err))
    }

    function onDisconnect(reason) {
        NewDashboard.deleteOne({ socketid: socket.id }, err => {
            if (err) console.log(err);
            socket.disconnect();
        });

    }
}