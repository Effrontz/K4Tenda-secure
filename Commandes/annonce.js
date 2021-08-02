const Discord = require("discord.js");
const { hasPermission } = require('discord.js')


module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la permission d'exécuter cette commande!");
    let botmessage = args.join(" ");
    let idrole = "870961826102386728"
    let channel = "863424967920058407"
    let embed = new Discord.MessageEmbed()
    .setColor("#D50A0A")
    .setTitle("❯ Annonce:")
    .setDescription(args.join(" "))
    .setFooter(`Annonce crée par ${message.author.username}`)
    .setTimestamp();
    message.channel.send(`<@&${idrole}>`)
    message.channel.send({embed: embed});
    message.delete().catch();

    console.log(`Commande ${message.author.lastMessage} executé sur le serveur ${message.guild.name} dans le salon ${message.channel.name} par le membre ${message.author.username} le ${message.createdAt}`)
}

module.exports.help = {
    name: "annonce"
}