const admin = require("../config/firebase-admin");

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