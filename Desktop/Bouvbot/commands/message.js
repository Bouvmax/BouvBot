module.exports = (client, msg) => {
  if (msg.author.bot) return;
  if (msg.content.indexOf(client.PREFIX) !== 0) return;
  const args = msg.content
    .slice(client.PREFIX.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd === "ping") msg.channel.send("Pong !");
  if (cmd === "r") {
    msg.channel.send(args.join(" "));
    msg
      .delete({ timeout: 50 })
      .then(msg.channel.send(`Le message a été envoyé par ${msg.author}`))
      .then(msg => console.log(`Message supprimé: ${msg.content}`));
  }
  client.on("message", async message => {
    if (!message.guild) return;

    if (message.content === "bot") {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        message.reply("Je t'ai rejoint");
        const dispatcher = connection.play("./mickey.mp2");
      } else {
        message.reply(
          "Tu dois te connecté dans un salon vocal pour que je te rejoigne :wink:"
        );
      }
    }
  });
};
