  
const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {

    message.delete()

    const moment = require('moment')
    const guild = message.guild
    let activities = message.author.presence.activities.filter(activity => activity.type === "PLAYING")
    const uEmbed = new Discord.MessageEmbed()
    .setTitle("Information de l'utilisateur")
    .addField("Pseudo de l'utilisateur:" , `${message.member.user.tag}`)
    .addField("ID:" ,`${message.member.user.id}`)
    .addField("Joue à 🎮 ", `${activities.length > 0 ? activities.map(activity => activity.name).join("\n") : "Ne joue pas"}`)
    .addField("Arriver sur le serveur:" ,`${moment(message.guild.members.cache.get(message.member.id).joinedAt).format("DD/MM/YYYY")}`)
    .addField("A rejoind Discord le: " ,`${moment(message.member.user.createdAt).format("DD/MM/YYYY")}`)
    .setColor("GREEN")
    message.channel.send(uEmbed)
};

module.exports.help = {
    name: 'ui'
};