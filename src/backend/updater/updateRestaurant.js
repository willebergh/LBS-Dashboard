const $ = require("cheerio");
const moment = require("moment");
const rp = require("request-promise");
const logger = require("../logger");
const Restaurant = require("../models/Restaurant");

module.exports = async function (name) {
    logger.log(`Updating restaurant ${name}...`.yellow, "Updater");

    const data = await getData(name);
    const restaurant = await Restaurant.findOne({ name });

    if (!restaurant) {
        const newRestaurant = new Restaurant(data);
        newRestaurant.save()
            .then(() => logger.log("Added new restaurant to the database".green, "Updater"))
            .catch(err => logger.error(err, "Updater"))
    } else {
        await Restaurant.deleteOne({ _id: restaurant._id });

        const newRestaurant = new Restaurant(data);
        newRestaurant.save()
            .then(() => logger.log(`Updated restaurant ${name}`.green, "Updater"))
            .catch(err => logger.error(err, "Updater"))
    }

}

async function getData(name) {
    switch (name) {
        case "jonsjacob": return await getDataJonsJacob();
    }
}

// Get data for restaurant Jöns Jacob
async function getDataJonsJacob() {
    let weeks;
    let currentWeekNr;

    rp("https://vecka.nu")
        .then(html => {
            currentWeekNr = parseInt($("time", html).text(), 10);
        })
        .catch(err => console.error(err));

    await rp("https://jonsjacob.gastrogate.com/lunchmatsedel-gymnasiet/")
        .then(html => {
            const arr = [];
            let lastWeek = -1;
            let lastDay = -1;
            let count = 0;
            let length = $('.page-block__part > p ', html).length;
            while (count < length) {
                const obj = $('.page-block__part > p ', html)[`${count}`].children[0];
                if (obj.name === "strong") {
                    if (obj.children[0].name === "u") {
                        lastDay = -1;
                        lastWeek++;
                        arr.push({
                            "title": obj.children[0].children[0].children[0].data,
                            "nr": parseInt(obj.children[0].children[0].children[0].data.replace(/\D/g, ""), 10),
                            "days": []
                        })
                    } else if (obj.children[0].name === "span") {
                        if (arr[lastWeek]) {
                            lastDay++;
                            arr[lastWeek].days.push({
                                "day": obj.children[0].children[0].data,
                                "menu": []
                            })
                        }
                    }
                } else if (obj.name === "span") {
                    if (obj.children[0].data !== "Gymnasiemeny HT 2019") {
                        if (arr[lastWeek]) {
                            arr[lastWeek].days[lastDay].menu.push(obj.children[0].data)
                        }
                    }
                }
                count++;
            }
            weeks = arr;
        })
        .catch(err => logger.error(err, "Updater"));

    function getDayOfTheWeek() {
        switch (moment().format("dddd")) {
            case "Monday": return "måndag";
            case "Tuesday": return "tisdag";
            case "Wednesday": return "onsdag";
            case "Thursday": return "torsdag";
            case "Friday": return "fredag";
            case "Saturday": return "måndag";
            case "Sunday": return "måndag";
        }
    }

    const thisWeek = weeks.find(week => week.nr === currentWeekNr);
    const today = thisWeek.days.find(day => day.day.toLowerCase() === getDayOfTheWeek());

    return ({
        name: "jonsjacob",
        displayName: "Jöns Jacob",
        today,
        thisWeek
    })
}