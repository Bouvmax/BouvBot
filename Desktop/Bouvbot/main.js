const Discord = require("discord.js");
const { Collection } = require("discord.js");
const { CLE, PREFIX } = require("./config");
const ytdl = require("ytdl-core");
const client = new Discord.Client();

client.PREFIX = PREFIX;

client.commands = new Collection();

client.on("message", message =>
  require("./events/message.js")(client, message)
);
client.on("ready", () => require("./events/ready.js")(client));
client.on("erreur", () => require("./events/erreur.js")(client));

client.commands.set("r", require("./commands/repeat.js"));

client.login(CLE);

client.on("debug", () => console.log);
client.on("error", () => console.error);

// Lecteur de vidéo youtube
client.on("message", async message => {
  if (!message.guild) return;
  const args = message.content
    .slice(client.PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd === "p") {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      message.channel.send("La lecture commence");
      const dispatcher = connection.play(ytdl(message.content));
      dispatcher.setVolume(0.1);
      message
        .delete({ timeout: 50 })
        .then(message => console.log(`Message supprimé: ${message.content}`));
    } else
      message.channel.send("Connecte toi dans un salon vocal pour m'y ajouter");
  }
  // Arrêt de la lecture
  if (cmd === "stop") {
    if (message.member.voice.channel) {
      const connection = message.member.voice.channel.leave();
      message.channel.send("Tchao les mecs!");
    }
  }
});
