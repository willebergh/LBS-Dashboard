const logger = require("../../logger");
const moment = require("moment");
const schedule = require("node-schedule");
require("dotenv").config();

const updateRestaurant = require("./updateRestaurant");
const updateForecast = require("./updateForecast");
const updateStation = require("./updateStation");

module.exports = class Updater {
    init() {
        this.addJob_updateRestaurants();
        this.addJob_updateForecast();
        this.addJob_updateStation();
    }

    addJob_updateRestaurants() {
        var rule = new schedule.RecurrenceRule();
        rule.hour = 7;
        rule.minute = 0;
        rule.second = 0;

        var j = schedule.scheduleJob(rule, () => {
            updateRestaurant("jonsjacob");
        })
    }

    addJob_updateForecast() {
        var rule = new schedule.RecurrenceRule();
        rule.hour = new schedule.Range(7, 18);
        rule.minute = [0, 15, 30, 45];
        rule.second = 0;

        var j = schedule.scheduleJob(rule, () => {
            updateForecast("stockholm");
        })
    }

    addJob_updateStation() {
        var rule = new schedule.RecurrenceRule();
        rule.hour = new schedule.Range(7, 18);
        rule.second = [0, 30];

        var j = schedule.scheduleJob(rule, function () {
            updateStation("3404");
        });
    }
}
