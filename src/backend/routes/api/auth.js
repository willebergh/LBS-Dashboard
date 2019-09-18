const express = require("express");
const router = express.Router();
const admin = require("../../config/firebase-admin");

router.post("/login", (req, res) => {
    const idToken = req.body.idToken;
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.session.user_uid = decodedToken.uid;
            req.session.save(err => {
                if (err) throw err;
                res.status(200).json({ msg: "success" })
            })
        })
        .catch(err => {
            res.send(err)
        });
});

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.status(200).json({ msg: "success" });
    })
});

module.exports = router;