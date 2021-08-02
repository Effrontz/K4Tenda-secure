const { Command } = require('discord-akairo')

module.exports.run = async(message, { user }) => {
    if (user.roles.cache.find(x => x.name === "Muet")) return message.util.send(`${user.user.username} est deja muet`)
    let role = message.guild.roles.cache.find(x => x.name === "Muet")
    if (!role) {
      role = await message.guild.roles.create({ data: { name: "Muet", color: require("../../Util/Colors").defaultColor } })
      await message.guild.channels.cache.map(x => x.createOverwrite(role.id, { SEND_MESSAGES: false }))
    }
    user.roles.add(role.id)
    message.util.send(`${user.user.username} n'a plus le droit à la parole`)
}

module.exports.help = {
    name: 'mute'
}