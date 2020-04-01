module.exports = (client, msg, args) => {
  msg.channel.send(args.join(" "));
  msg
    .delete({ timeout: 50 })
    .then(msg.channel.send(`Le message a été envoyé par ${msg.author}`))
    .then(msg => console.log(`Message supprimé: ${msg.content}`));
};
