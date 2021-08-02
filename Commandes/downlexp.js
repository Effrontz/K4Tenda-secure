const db = require('quick.db');

module.exports.run = async(bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous n'avez pas les autorisations requises ! - [ADMINISTRATEUR]**")

    try {
        let a  = await message.channel.send(`guildMessages_${message.guild.id}`)

        if (!a) {
            return message.channel.send("**Le système d'xp est déjà désactivés sur le serveur !**")
        } else {
            message.channel.send(`guildMessages_${message.guild.id}`)

            message.channel.send("**Le système d'xp est désactivés avec succès !**")
        }
        return;
    } catch {
        return message.channel.send("**Quelque chose s'est mal passé !**")
    }
}
module.exports.help = {
    name: 'downlexp'
}