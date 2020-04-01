module.exports = (client, msg) => {
  if (msg.author.bot) return;
  if (msg.content.indexOf(client.PREFIX) !== 0) return;
  const args = msg.content
    .slice(client.PREFIX.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (client.commands.has(command))
    client.commands.get(command)(client, msg, args);
};
