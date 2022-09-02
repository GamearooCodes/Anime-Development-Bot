const { PermissionFlagsBits, EmbedBuilder, CommandInteraction, Client, ApplicationCommandOptionType, ButtonBuilder } = require("discord.js");
const fs = require('node:fs');
const path = require("node:path");
const { beta, appschannel } = require("../../../config");
const ConsoleLog = require("../../Utils/Logger");
const { questions } = require("../../Utils/questions");

module.exports = {
    name: 'staff_applications',
    description: 'staff apps',
    perm: PermissionFlagsBits.SendMessages,
    options: [
        {
            name: 'apply',
            description: 'apply for staff',
            type: ApplicationCommandOptionType.Subcommand
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
            case "apply":
                await interaction.deferReply({ ephemeral: true });
                var collectCounter = 0;
                var endCounter = 0;
                const message = interaction;





                const appStart = await interaction.member.send(questions[collectCounter++]).catch(err => {
                    return interaction.editReply('Error please enable dms for this server so i can dm you!')
                })
                if (!appStart) return new ConsoleLog().error('AppStart doesn\'t see or is missing')
                const channel = await appStart.channel;
                if (!channel) return new ConsoleLog().error("no channel")
                const filter = m => m.author.id === interaction.member.id;
                const collector = appStart.channel.createMessageCollector({ filter });

                if (!collector) return new ConsoleLog().error("no collector")

                // console.log(collector)



                collector.on('collect', m => {

                    if (collectCounter < questions.length) {
                        channel.send(questions[collectCounter++]);

                    } else {
                        channel.send('You application was handed off to our management team to be reviewed NOTE! our team was notified by a ping do not message them to review it it will cause your app to be declined!');
                        collector.stop('fulfilled');
                    }
                })

                const appChannel = client.channels.cache.get(appschannel);

                const approveButton = new ButtonBuilder().setCustomId('approvedapp').setEmoji("✅")

                collector.on('end', (collected, reason) => {
                    if (reason === 'fulfilled') {
                        let index = 1;
                        const mappedRes = collected.map((msg) => {
                            return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`
                        }).join("\n\n");

                        appChannel.send({
                            content: `<@&924109173069844491> A Application was submitted!`,
                            embeds: [new EmbedBuilder()
                                .setTitle(`Application for ${interaction.member}`)
                                .setDescription(mappedRes)
                                .setColor('DarkGold')
                                .setTimestamp()],

                        }

                        )
                    } else {
                        return;
                    }
                })

                interaction.editReply('Dmed you you application')
                break;
        }
    }
}