const { Client, Message } = require('discord.js') 

module.exports = {
    name: 'nuke',
    usage: '!nuke',
    description: 'Delete a channel and remake it exactly how it was!',
    run: async(client, message, args) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Vous n'avez pas la permission !")
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Je n’ai pas la permission de gérer les channel.')

        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parentID);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            ch.send(
                'Ce chanel a été nuked!https://tenor.com/view/explosion-boom-explode-gif-17383346'
            )
        })
    }
}

module.exports.help = {
    name: 'nuke'
}