const express = require("express");
const router = express.Router();

router.use("/sl", require("./routes/sl"));
router.use("/smhi", require("./routes/smhi"));

module.exports = router;