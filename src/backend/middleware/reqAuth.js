const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();

function reqAuth(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).json({ msg: "unauthorized" });
    }
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

module.exports.jwt = (req, res, next) => {
    var token = req.cookies.token;
    try {
        if (!token) throw "no-token";
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = decoded.user;
    } catch (err) {
        return res.status(401).json(error("invalid-token"));
    }
    return next();
}

function error(type, msg) {
    let obj = {
        msg: "error"
    };
    typeof type === "string" ? obj.type = type : null;
    typeof msg === "string" ? obj.msg = msg : null;
    return obj;
}

module.exports.websocket.cookie = function (socket, next) {
    try {
        var token = cookie.parse(socket.handshake.headers.cookie).token;
        if (!token) throw { message: "no-token" };
        var decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        console.log(err);
        let error = new Error("authentication-error");
        error.data = {
            type: "authentication-error",
            message: err.message
        };
        return next(error);
    }
    socket.decoded = decoded;
    next();
}