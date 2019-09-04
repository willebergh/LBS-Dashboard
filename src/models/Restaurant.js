const mongoose = require("mongoose");

const FoodMenuSchema = new mongoose.Schema({
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

module.exports = mongoose.model("foodMenu", FoodMenuSchema);