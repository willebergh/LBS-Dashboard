const admin = require("../config/firebase-admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function reqAuth(req, res, next) {
    if (!req.session.idToken) return res.redirect("http://localhost:3000/login");

    admin.auth().verifyIdToken(req.session.idToken)
        .then(() => {
            next();
        })
        .catch(err => {
            res.send(err)
        });
}

module.exports = reqAuth;


module.exports.websocket = (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                let error = new Error("authentication-error");
                error.data = {
                    type: "authentication-error",
                    message: err.message
                };
                return next(error);
            }
            socket.decoded = decoded;
            console.log("new-connection");
            next();
        });
    } else {
        console.log("authentication-error")
        next(new Error('Authentication error'));
    }
}