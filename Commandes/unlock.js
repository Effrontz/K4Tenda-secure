const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous n'avez pas la permission de dévérouiller ce channel.**")
    if (!client.lockit) client.lockit = [];
    message.channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: true
    }).then(g => {
        g.edit({
            name: ' 🔓' + g.name
        })
        g.send(`🔓 | Le salon a été débloqué par ${message.author}`)
    })





};

module.exports.help = {
    name: 'unlock'
}