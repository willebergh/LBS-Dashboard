const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    today: {
        type: Object
    },
    thisWeek: {
        type: Object
    }
});

module.exports = mongoose.model("restaurant", RestaurantSchema);