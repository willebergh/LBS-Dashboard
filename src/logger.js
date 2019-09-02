
// Console log message
module.exports.log = function log(source, message) {
    console.log(`[${source}] ${message}`)
}

// Console log error
module.exports.err = function err(source, error) {
    console.error(`[${source}]` + error)
}
