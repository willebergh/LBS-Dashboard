const express = require("express");
const router = express.Router();

router.use("/sl", require("./routes/sl"));
router.use("/smhi", require("./routes/smhi"));
router.use("/food", require("./routes/food"));

module.exports = router;