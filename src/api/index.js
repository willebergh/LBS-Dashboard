const express = require("express");
const router = express.Router();

router.use("/sl", require("./routes/sl"));

module.exports = router;