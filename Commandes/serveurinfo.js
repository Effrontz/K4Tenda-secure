const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {


    let aEmbed = new Discord.MessageEmbed()
    .setColor("RAMDOM")
    .setTitle("Informations du serveur:")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**💬Nom du serveur:**", `${message.guild.name}`, true)
    .addField("**👑Propriétaire:**", `${message.guild.owner}`, true)
    .addField("**👤Membres:**", `${message.guild.memberCount}`, true)
    .addField("**👨‍👧‍👧‍Roles:**", `${message.guild.roles.cache.size}`, true)
    .setFooter(`Informations du serveur ${message.guild.name} `, bot.user.displayAvatarURL())
    message.channel.send({embed: aEmbed});
}

module.exports.help = {
    name: "serveurinfo"
}