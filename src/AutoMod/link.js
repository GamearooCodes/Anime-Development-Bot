const { Message, Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, ComponentType } = require("discord.js");
const { allowedLinks, automodlogs, staffrole } = require("../../config");

class AutoModLinks {
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     
     */
    constructor(client, message) {



        message.channel.send({ content: `<@${message.author.id}> That link you posted is not on our allowed list so i have removed it please avoid banned links. \n Allowed Links: ${allowedLinks.map(m => `**${m}**`).join(", ")} \n A mod and/or management team has recived this report for manual review if this was false any action made by me (timeouts, bans, or kicks) will be reverted and youll recive a dm by me or the staff member that action was undone if correct then the staff can take furture action or approve my action as is! \n ⚠️Notice⚠️ All action approved by staff is done for life. \n Want to report this action as false Contact support! \n\n Anime Developmetns auto mod system is still in beta and suggestions are welcome use /suggest to make one` });

        let embed = new EmbedBuilder().setColor("Yellow").setTitle('Auto Mod Action Token (Link)').setDescription(`I took action on a message sent in ${message.channel} \n Message: ${message.content} \n Member: ${message.author} \n Action token: Member Verbally warned and message removed!`);

        let channel = client.channels.cache.get(automodlogs);

        let deny = new ButtonBuilder().setCustomId('linkdeny').setLabel('deny action').setStyle(ButtonStyle.Danger).setEmoji("⛔");
        let approve = new ButtonBuilder().setCustomId('linkapprove').setLabel('approve action').setStyle(ButtonStyle.Success).setEmoji("✅");
        let punish = new ButtonBuilder().setCustomId('linkpunish').setLabel('Use Action Punishments Instead').setStyle(ButtonStyle.Secondary).setEmoji("🔨").setDisabled(true);

        let msg = channel.send({ content: `<@&${staffrole}>`, embeds: [embed], components: [new ActionRowBuilder().addComponents(approve, punish, deny)] });


        let collector = channel.createMessageComponentCollector({ componentType: ComponentType.Button });


        collector.on('collect', i => {
            switch (i.customId) {
                case "linkdeny":
                    let approve = new ButtonBuilder().setCustomId('linkapprove').setLabel('approve action').setStyle(ButtonStyle.Success).setEmoji("✅").setDisabled(true);
                    let punish3 = new ButtonBuilder().setCustomId('linkpunish').setLabel('Use Action Punishments Instead').setStyle(ButtonStyle.Secondary).setEmoji("🔨").setDisabled(true);
                    let deny = new ButtonBuilder().setCustomId('linkdeny').setLabel('deny action').setStyle(ButtonStyle.Danger).setEmoji("⛔").setDisabled(true);

                    i.message.edit({ components: [new ActionRowBuilder().addComponents(approve, punish3, deny)], content: `Action Denied by <@${i.member.id}>` });

                    i.reply({ content: 'Action Denied', ephemeral: true });

                    message.author.send('Sorry we found a past action/report i made was false and was undone. Please forgive us as i work on making sure this server stays safe!')

                    collector.stop();

                    break;
                case "linkapprove":

                    let approve2 = new ButtonBuilder().setCustomId('linkapprove').setLabel('approve action').setStyle(ButtonStyle.Success).setEmoji("✅").setDisabled(true);
                    let deny2 = new ButtonBuilder().setCustomId('linkdeny').setLabel('deny action').setStyle(ButtonStyle.Danger).setEmoji("⛔").setDisabled(true);
                    let punish2 = new ButtonBuilder().setCustomId('linkpunish').setLabel('Use Action Punishments Instead').setStyle(ButtonStyle.Secondary).setEmoji("🔨").setDisabled(true);

                    i.message.edit({ components: [new ActionRowBuilder().addComponents(approve2, punish, deny2)], content: `Action Approved by: <@${i.member.id}>` });

                    i.reply({ content: 'Action Approved', ephemeral: true });

                    message.author.send(`You recived a verbal warning for posting a link this action was approved by: <@${i.member.id}>!`)

                    collector.stop();

                    break;

            }
        });



        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });






        message.delete();


    }
}

module.exports = AutoModLinks;