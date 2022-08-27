const { Client } = require("discord.js");
const { version } = require("../../config");
const RamApi = require("../Utils/apiclient");
const ConsoleLog = require("../Utils/Logger");

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        new RamApi().version_check();

        // Code here

        new ConsoleLog().info(`${client.user.tag} is Online and ready on ${version}`)
    }
}