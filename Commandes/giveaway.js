const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "giveaway",
  description: "Create a simple giveaway",
  usage: "<temps> <channel> <nom du giveaway>",
  category: "fun",
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`Vous n'avez pas précisé votre heure!`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `Vous n'avez pas utilisé le formatage correct pour le temps!`
      );
    if (isNaN(args[0][0])) return message.channel.send(`Ce n'est pas un nombre.`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `Je n'ai pas trouvé ce channel sur le serveur!`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`Aucun prix spécifier!`);
    message.channel.send(`*Giveaway crée sur le channel: ${channel}*`);
    let Embed = new MessageEmbed()
      .setTitle(`**${prize}**`)
      .setDescription(
        `${message.author} a commencer un nouveau giveaway **${prize}**`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`RED`);
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `Pas assez de personnes ont réagi pour que je commence a désignier un gagnant!`
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `Le gagnant du giveaway pour: **${prize}** est... ${winner}`
      );
    }, ms(args[0]));
  },
};
module.exports.help = {
    name: "giveaway"
}; 