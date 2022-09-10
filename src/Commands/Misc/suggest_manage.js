const { PermissionFlagsBits, EmbedBuilder, CommandInteraction, Client, ApplicationCommandOptionType, ButtonBuilder } = require("discord.js");
const fs = require('node:fs');
const path = require("node:path");
const { beta, appschannel, suggestchn, guildID } = require("../../../config");
const ConsoleLog = require("../../Utils/Logger");
const { questions } = require("../../Utils/questions");

module.exports = {
    name: 'suggest_manager',
    description: 'suggest manage',
    perm: PermissionFlagsBits.Administrator,
    options: [
        {
            name: 'approve',
            description: 'approve suggestion',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'messageid',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    description: "the msg id of the msg to approve"
                },
                {
                    name: 'acceptquery',
                    type: ApplicationCommandOptionType.String,
                    required: false,
                    description: "the reason or query of this acceptance"
                }
            ]
        },
        {
            name: 'deny',
            description: 'deny suggestion',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'messageid',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    description: "the msg id of the msg to deny"
                },
                {
                    name: 'denyquery',
                    type: ApplicationCommandOptionType.String,
                    required: false,
                    description: "the reason or query of this denial"
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
        const { options } = interaction;

        const cmd = options.getSubcommand();






        switch (cmd) {
            case "approve":

                let asuggestchan = await interaction.guild.channels.cache.get(suggestchn);
                const asuggestedEmbed = await asuggestchan.messages.fetch(options.getString("messageid"));


                const data = asuggestedEmbed.embeds[0];


                const embed = new EmbedBuilder()
                    .setDescription(`${data.description}`)
                    .setColor("Green")
                    .setTitle(data.title)
                    .addFields({ name: `Status:`, value: `Approved By: <@${interaction.member.id}>` });

                if (data.fields[1]) embed.addFields(data.fields[1]);
                if (options.getString("acceptquery")) embed.setFooter({ text: `Accepted for: ${options.getString('acceptquery')}` })

                asuggestedEmbed.edit({ embeds: [embed] })

                interaction.reply({ content: 'done', ephemeral: true })

                break;
            case "deny":
                let dsuggestchan = await interaction.guild.channels.cache.get(suggestchn);
                const dsuggestedEmbed = await dsuggestchan.messages.fetch(options.getString("messageid"));


                const ddata = dsuggestedEmbed.embeds[0];


                const dembed = new EmbedBuilder()
                    .setDescription(`${ddata.description}`)
                    .setColor("Red")
                    .setTitle(ddata.title)
                    .addFields({ name: `Status:`, value: `Denied By: <@${interaction.member.id}>` });

                if (ddata.fields[1]) dembed.addFields(ddata.fields[1]);
                if (options.getString("denyquery")) dembed.setFooter({ text: `Denied for: ${options.getString('denyquery')}` })

                dsuggestedEmbed.edit({ embeds: [dembed] })

                interaction.reply({ content: 'done', ephemeral: true })
                break;
        }
    }
}