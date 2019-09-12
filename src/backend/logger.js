const moment = require("moment");
const colors = require("colors");

// Console log message
module.exports.log = function log(...args) {
    const message = args[0];
    const tags = args.slice(1).map(t => `[${t}]`.cyan);
    console.log(`[${moment().format("HH:mm:ss")}]`.gray, ...tags, message);
}

// Console log error
module.exports.error = function (...args) {
    const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`.red) : []
    console.error(`[${moment().format("HH:mm:ss")}]`.gray, '[ErrorLog]'.red, ...tags, "from", args[args.length - 1].underline.cyan)
}

module.exports.loading = function (...args) {
    const message = args[0];
    const tags = args.slice(1).map(t => `[${t}]`.cyan);
    console.log(`[${moment().format("HH:mm:ss")}]`.gray, ...tags, message.yellow);
}

module.exports.success = function (...args) {
    const message = args[0];
    const tags = args.slice(1).map(t => `[${t}]`.cyan);
    console.log(`[${moment().format("HH:mm:ss")}]`.gray, ...tags, message.green);
}
