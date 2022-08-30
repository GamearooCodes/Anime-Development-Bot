const { RamApi } = require("ram-api.js");
const { ram_api } = require("../../config");

class ApiClient extends RamApi {
    constructor() {
        super(ram_api.key, ram_api.version);
    }
}

module.exports = ApiClient;