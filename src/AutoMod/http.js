const { Message, Client, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, ComponentType } = require("discord.js");
const { allowedLinks, automodlogs, staffrole } = require("../../config");

class AutoModHttp {
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     
     */
    constructor(client, message) {



        message.channel.send({ content: `<@${message.author.id}> That link you posted is not secured! Please use https:// if the site is not https:// it is not allowed on our server this action is not able to be undone by staff for security!` });

        let embed = new EmbedBuilder().setColor("Yellow").setTitle('Auto Mod Action Token (Link)').setDescription(`I took action on a message sent in ${message.channel} \n Message: ${message.content} \n Member: ${message.author} \n Action token: Member warned and message removed!`);

        let channel = client.channels.cache.get(automodlogs);



        let msg = channel.send({ content: `Action token this action can not be undone due to security`, embeds: [embed] });










        message.delete();


    }
}

module.exports = AutoModHttp;