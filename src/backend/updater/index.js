const schedule = require("node-schedule");
require("dotenv").config();

const updateRestaurant = require("./updateRestaurant");
const updateForecast = require("./updateForecast");
const updateStation = require("./updateStation");

module.exports = class Updater {
    constructor(io) {
        this.io = io;
    }

    init() {
        this.addJob_updateRestaurants();
        this.addJob_updateForecast();
        this.addJob_updateStation(this.io);
    }

    addJob_updateRestaurants(io) {
        var rule = new schedule.RecurrenceRule();
        rule.hour = 7;
        rule.minute = 0;
        rule.second = 0;

        var j = schedule.scheduleJob(rule, () => {
            updateRestaurant("jonsjacob", io);
        })
    }

    addJob_updateForecast(io) {
        var rule = new schedule.RecurrenceRule();
        rule.hour = new schedule.Range(7, 18);
        rule.minute = [0, 15, 30, 45];
        rule.second = 0;

        var j = schedule.scheduleJob(rule, () => {
            updateForecast("stockholm", io);
        })
    }

    addJob_updateStation(io) {
        var rule = new schedule.RecurrenceRule();
        rule.hour = new schedule.Range(7, 18);
        rule.second = [0, 30];

        var j = schedule.scheduleJob(rule, function () {
            updateStation("3404", io);
        });
    }

}
