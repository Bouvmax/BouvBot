const Discord = require("discord.js");
const { Collection, msg } = require("discord.js");
const { CLE, PREFIX } = require("./config");
const client = new Discord.Client();

client.PREFIX = PREFIX;

client.commands = new Collection();
client.on("ready", () => require("./events/ready.js")(client));
client.on("message", msg => require("./commands/message.js")(client, msg));
client.on("romain", msg => require("./events/romain.js")(msg));

client.login(CLE);

client.on("debug", () => console.log);
client.on("error", () => console.error);

// Zone de test
