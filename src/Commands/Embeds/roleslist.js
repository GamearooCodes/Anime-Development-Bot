const { PermissionFlagsBits, EmbedBuilder, CommandInteraction, Client } = require("discord.js");
const fs = require('node:fs');
const path = require("node:path");

module.exports = {
    name: 'roleslist',
    description: 'the roles list embed',
    perm: PermissionFlagsBits.Administrator,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
        let pathtxt = path.join(__dirname, '../../../text docs/roleslist.txt');
        var text = fs.readFileSync(pathtxt).toString('utf-8');

        const embed = new EmbedBuilder().setDescription(text).setTitle('Role Info List').setColor("Blurple");

        interaction.channel.send({ embeds: [embed] });

        interaction.reply({ content: 'Done', ephemeral: true })

    }
}