const { PermissionFlagsBits, CommandInteraction, Client, InteractionType, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { suggestchn, emojis } = require("../../../config");
const ApiClient = require("../../Utils/apiclient");

const ConsoleLog = require("../../Utils/logger");

module.exports = {
    name: 'suggest',
    description: 'Get a hello',
    perm: PermissionFlagsBits.SendMessages,
    options: [
        {
            name: 'bot',
            description: 'The name of the bot for this suggestion (if server say server)',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'suggestion',
            description: 'The suggestion you\'ll like to suggest',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'example',
            description: 'An example',
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {*} extras 
     */
    async run(interaction, client, extras) {
        let bot = interaction.options.getString("bot");
        let sugg = interaction.options.getString("suggestion");
        let example = interaction.options.getString("example") || "NULL";


        const suggchannel = await interaction.guild.channels.cache.get(suggestchn);

        const embed = new EmbedBuilder()

            .setDescription(`For: ${bot} \n\n Suggestion: ${sugg} \n\n To vote react with ${emojis.yes} for yes and ${emojis.no} for no`)
            .setColor("Yellow")
            .setTitle(`Suggestion By: ${interaction.user.tag}`)
            

           
            .addFields({ name: `Status:`, value: `PENDING VOTES` });

        if (example !== "NULL") embed.addFields({ name: `Example:`, value: example });

        let msg = await suggchannel.send({ embeds: [embed] });

        interaction.reply({ content: 'Suggestion sent to the upvoted suggestions!', ephemeral: true });

        msg.react(emojis.yes);
        msg.react(emojis.no);


    }
}