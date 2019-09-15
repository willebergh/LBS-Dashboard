const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
require("dotenv").config();

const store = new MongoStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions"
});

module.exports = session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    store: store,
    resave: true,
    saveUninitialized: true
});