const schedule = require("node-schedule");
require("dotenv").config();

const { restaurants, weathers, stations } = require("../dataSources");
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
        this.addJob_updateStation();
    }

    addJob_updateRestaurants() {
        var rule = new schedule.RecurrenceRule();
        rule.hour = 7;
        rule.minute = 0;
        rule.second = 0;

        var j = schedule.scheduleJob(rule, () => {
            restaurants.forEach(({ id }) => updateRestaurant(id, this.io))
        })
    }

    addJob_updateForecast() {
        var rule = new schedule.RecurrenceRule();
        rule.hour = new schedule.Range(7, 18);
        rule.minute = [0, 15, 30, 45];
        rule.second = 0;

        var j = schedule.scheduleJob(rule, () => {
            weathers.forEach(({ id }) => updateForecast(id, this.io))
        })
    }

    addJob_updateStation() {
        var rule = new schedule.RecurrenceRule();
        rule.hour = new schedule.Range(7, 18);
        rule.second = [0, 30];

        var j = schedule.scheduleJob(rule, () => {
            stations.forEach(({ id }) => updateStation(id, this.io))
        });
    }

}
