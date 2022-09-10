const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require("node:path");
const { token, automodignored } = require('../config');
const AutoModClass = require('./Utils/automod');
const ConsoleLog = require('./Utils/logger');

class BotClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.DirectMessages
            ],
            partials: [Partials.User],
        })
        this.commands = new Collection();
    }
    start() {
        const eventsPath = path.join(__dirname, './Events');
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);

            const event = require(filePath);

            if (event.once) {
                this.once(event.name, (...args) => event.run(...args));
            } else {
                this.on(event.name, (...args) => event.run(...args));
            }
        }

        this.on('messageCreate', async (message) => {
            if (message.author.bot) return;
            let ignored = await message.guild.roles.cache.get(automodignored);

            if (message.member.roles.cache.has(ignored.id)) return new ConsoleLog().info('Member is ignored')
            console.log(message.content)
            new AutoModClass(this).LinkChecker(message);
        })

        this.login(token);
    }
}

module.exports = BotClient;
