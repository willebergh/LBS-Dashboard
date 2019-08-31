const express = require("express");
const router = express.Router();
const rp = require("request-promise");
const $ = require("cheerio");


router.get("/", async (req, res) => {

    let foodMenu;
    let currentWeekNr;

    console.log("rp(vecka.nu)")
    rp("https://vecka.nu")
        .then(html => {
            console.log("rp(vecka.nu.then())")
            currentWeekNr = parseInt($("time", html).text(), 10);
            console.log("rp(vecka.nu.then().complete)")
        })
        .catch(err => console.error(err));

    console.log("rp(jönsjacob)")
    await rp("https://jonsjacob.gastrogate.com/lunchmatsedel-gymnasiet/")
        .then(html => {
            console.log("rp(jönsjacob.then())")

            const arr = [];

            let lastWeek = -1;
            let lastDay = -1;
            let count = 0;
            let length = $('.page-block__part > p ', html).length;

            console.log(`Scanning ${length} elements...`)
            while (count < length) {
                const obj = $('.page-block__part > p ', html)[`${count}`].children[0];
                if (obj.name === "strong") {
                    if (obj.children[0].name === "u") {

                        lastDay = -1;
                        lastWeek++;

                        arr.push({
                            "type": "week",
                            "title": obj.children[0].children[0].children[0].data,
                            "nr": parseInt(obj.children[0].children[0].children[0].data.replace(/\D/g, ""), 10),
                            "days": []
                        })

                    } else if (obj.children[0].name === "span") {
                        if (arr[lastWeek]) {
                            lastDay++;
                            arr[lastWeek].days.push({
                                "type": "day",
                                "title": obj.children[0].children[0].data,
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
                process.stdout.write(`Scanned ${count}/${length} elements.\r`);
            }

            console.log("")

            foodMenu = arr;
            console.log("rp(jönsjacob.then().complete)")
        })
        .catch(err => console.error(err));

    console.log("res.status().json()")
    res.status(200).json({
        currentWeekNr,
        foodMenu
    })

});


module.exports = router;