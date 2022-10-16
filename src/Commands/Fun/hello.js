const { PermissionFlagsBits, CommandInteraction, Client } = require("discord.js");
const ApiClient = require("../../Utils/apiclient");

const ConsoleLog = require("../../Utils/Logger");

module.exports = {
    name: 'hello',
    description: 'Get a hello',
    perm: PermissionFlagsBits.SendMessages,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
        let res = await new ApiClient().helloAsync("english").catch(err => { });

        interaction.reply({ content: res.text });
    }
}