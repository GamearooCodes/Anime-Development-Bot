const { Client, Message } = require("discord.js");
const { allowedLinks } = require("../../config");
const AutoModHttp = require("../AutoMod/http");
const AutoModLinks = require("../AutoMod/link");
const ConsoleLog = require("./Logger");


class AutoModClass {
    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {

        this.client = client;
    }
    /**
     * 
     * @param {Message} message 
     */
    LinkChecker(message) {

        console.log(message.content)

        let count = 0;
        let reported = false;

        // if (!allowedLinks.some(link => message.content.includes(link)) && message.content.includes("https://")) {
        if (!(new RegExp(allowedLinks.join('|'))).test(message.content) && message.content.includes("https://")) {


            count = allowedLinks.length + 10;
            new ConsoleLog().warn('A message was flagged for a link not on my list and was sent to devs for manual review I deleted the message and warned the member that links are not allowed!');
            new AutoModLinks(this.client, message)
        } else {

            if (message.content.includes("http://")) {
                new ConsoleLog().warn('A message was flagged for a link using http:// and not https:// and the action is not unmovable');
                new AutoModHttp(this.client, message)

            } else {
                new ConsoleLog().info('This message follows anime devs allowed links!')
            }
        }


        // if (!message.content.includes(allowedLinks)) {

        //     if (!message.content.includes("https://" || "http://")) return;
        //     if (message.content.includes(allowedLinks)) return;

        //     count = allowedLinks.length + 10;
        //     new ConsoleLog().warn('A message was flagged for a link not on my list and was sent to devs for manual review I deleted the message and warned the member that links are not allowed!');
        //     new AutoModLinks(this.client, message)

        // } else {

        //     new ConsoleLog().info('This message follows anime devs allowed links!')
        // }



    }
}

module.exports = AutoModClass;