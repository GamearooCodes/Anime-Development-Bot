const BotClient = require("./src/client");
const ConsoleLog = require("./src/Utils/Logger");

new ConsoleLog().info('Starting Bot!')

setTimeout(() => new BotClient().start(), 5000);

