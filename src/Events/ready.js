const { Client } = require("discord.js");
const { version } = require("../../config");
const ApiClient = require("../Utils/apiclient");

const ConsoleLog = require("../Utils/Logger");

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        new ApiClient().version_checkAsync();

        // Code here

        new ConsoleLog().info(`${client.user.tag} is Online and ready on ${version}`)
    }
}