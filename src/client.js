const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('node:fs');
const path = require("node:path");
const { token } = require('../config');

class BotClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds
            ],
            partials: [Partials.User],
        })
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

        this.login(token);
    }
}

module.exports = BotClient;
