const { Logs } = require("ram-api.js");

class ConsoleLog extends Logs {
    constructor() {
        super("Anime Development");
    }
}

module.exports = ConsoleLog;