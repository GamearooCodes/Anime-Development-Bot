const { APiClient } = require("ram-api.js");
const { ram_api } = require("../../config");

class RamApi extends APiClient {
    constructor() {
        super(ram_api.key, ram_api.version);
    }
}

module.exports = RamApi;