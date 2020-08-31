const $ = require("cheerio");
const moment = require("moment");
const rp = require("request-promise");
const logger = require("../logger");
const Restaurant = require("../models/Restaurant");
const Tesseract = require("tesseract.js");
const axios = require("axios");

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = async function (name, count, io) {
    try {

        if (!name) throw "Restaurant name is required!";
        if (!io) throw "Websocket is required!";

        logger.log(`Updating restaurant ${name}#${count}...`.yellow, "Updater");

        const data = await getData(name);
        const restaurant = await Restaurant.findOne({ name });

        if (!restaurant) {
            const newRestaurant = new Restaurant(data);
            await newRestaurant.save();
        } else {
            restaurant.overwrite(data);
            await restaurant.save();
        }

        logger.log(`Updated restaurant ${name}#${count}`.green, "Updater");
        io.of("/dashboards").in(`restaurant-${name}`).emit("update-restaurant", data)

    } catch (err) {
        if (typeof err === "string") {
            logger.error(err, "Updater", `Restaurant ${name}#${count}`);
        } else {
            logger.error(err.message, "Updater", `Restaurant ${name}#${count}`);
        }
    }
}

async function getData(name) {
    switch (name) {
        case "jonsjacob": return await getDataJonsJacob_v3();
    }
}

// Get data for restaurant Jöns Jacob
async function getDataJonsJacob_v1() {
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

async function getDataJonsJacob_v2() {
    const worker = Tesseract.createWorker({
        logger: ({ workerId, jobId, status, progress }) => {
            const log = [`[${moment().format("HH:mm:ss")}]`.gray, `[Tesseract]`.cyan, `${status.capitalize()}`.yellow, `${Math.floor(progress * 100)}%`.green];
            if (workerId) log.splice(2, 0, `[${workerId}]`.cyan);
            if (jobId) log.splice(log.length - 2, 0, `${jobId}:`.cyan);
            console.log(...log);
        }
    });

    await worker.load();
    await worker.loadLanguage("swe");
    await worker.initialize("swe");

    const url = "https://jonsjacob.gastrogate.com/gymnasiemeny/";
    const imageUrl = (await axios.get(url)).headers.refresh.replace("0;url=", "");
    const text = (await worker.recognize(imageUrl)).data.text;

    const lines = text.split("\n");
    const lowerCaseLines = lines.map(_ => _.toLowerCase());
    const indexOfWeek = lowerCaseLines.findIndex(_ => _.startsWith("vecka"));

    const thisWeek = {
        title: lines[indexOfWeek],
        nr: parseInt(lines[indexOfWeek].replace(/[^0-9]/g, "")),
        days: []
    };

    ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "quality of life services"]
        .map(day => lowerCaseLines.findIndex(_ => _.startsWith(day)))
        .reduce((prev, value) => {
            const day = { day: lowerCaseLines[prev].capitalize(), menu: [] };
            for (var i = prev + 1; i < value; i++) {
                day.menu.push(lines[i]);
            }
            thisWeek.days.push(day);
            return value;
        });

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

    const today = thisWeek.days.find(_ => _.day.toLowerCase() === getDayOfTheWeek());

    return ({
        name: "jonsjacob",
        displayName: "Jöns Jacob",
        today,
        thisWeek
    });
}


async function getDataJonsJacob_v3() {
    const html = await rp("https://sodexo.mashie.com/public/app/Restaurang%20J%C3%B6ns%20Jacob/de7a1375?country=se");
    const loadedHtml = $.load(html);
    const menuList = loadedHtml(".panel-primary > .list-group")
    const catcher = []

    menuList.map((i, el) => {
        el.children
            .filter(x => x.type === "tag")
            .map(el2 => {
                el2.children
                    .filter(x => x.type === "tag")
                    .map(el3 => {
                        catcher.push(el3)
                    })
            })
    })

    Array.prototype.getUnique = function () {
        var o = {}, a = [], i, e;
        for (i = 0; e = this[i]; i++) { o[e] = 1 };
        for (e in o) { a.push(e) };
        return a;
    }

    const todaysMenu = catcher
        .filter(x => x.attribs.class === "app-daymenu-name")
        .map(el => el.children[0].data)
        .getUnique();

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

    return ({
        name: "jonsjacob",
        displayName: "Jöns Jacob",
        today: {
            day: getDayOfTheWeek(),
            menu: todaysMenu
        },
    })
}