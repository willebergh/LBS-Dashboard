const mongoose = require("mongoose");

const FoodMenuSchema = new mongoose.Schema({
    today: {
        type: Object
    },
    currentWeek: {
        type: Object
    }
});

module.exports = mongoose.model("foodMenu", FoodMenuSchema);