const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') msg.channel.send('Pong!');
});

client.login("Njk0MTEwNzU5ODY0NzYyNDE4.XoG_Gw.jK_KZQ5DTrZQ8XjoeHmNw7Zx6Tg");