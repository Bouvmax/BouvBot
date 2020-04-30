const { Collection, Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const { readdirSync } = require("fs");

const client = new Client();
["commands"].forEach((x) => (client[x] = new Collection()));

const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach((dirs) => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith(".js")
    );
    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`${getFileName.help.name} ✅`);
    }
  });
};
loadCommands();

client.on("ready", () => console.log("Je suis prêt !"));
client.on("debug", () => console.log);
client.on("error", () => console.error);

client.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName)
    );
  if (!command) return;

  if (command.help.args && !args.length) {
    let noArgsReply = `Il faut mettre des arguments pour cette commande, ${message.author}!`;

    if (command.help.usage)
      noArgsReply += `\n Voici comment utiliser la commande: \`${PREFIX}${command.help.name}${command.help.usage}\``;

    return message.channel.send(noArgsReply);
  }
  client.channels.cache
    .find((n) => n.name === "logs-bot")
    .send(
      `La commande ${command.help.name} a été utilisé par ${message.author}`
    );
  command.run(client, message, args);
});

client.PREFIX = PREFIX; // Appel du PREFIX "!"
client.login(TOKEN);
