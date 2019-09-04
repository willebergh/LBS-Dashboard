const colors = require("colors");

// Console log message
module.exports.log = function log(...args) {
    const message = args[0];
    const tags = args.slice(1).map(t => `[${t}]`.cyan);
    console.log(...tags, message);
}

// Console log error
module.exports.error = function (...args) {
    const tags = args.length > 1 ? args.slice(0, -1).map(t => `[${t}]`.red) : []
    console.error('[ErrorLog]'.red, ...tags, "from", args[args.length - 1].underline.cyan)
}
