const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({
    "Access-Control-Allow-Origin": "*"
}))

const routes = require("./src/routes");
app.use(routes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))