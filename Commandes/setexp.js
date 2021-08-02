const db = require('quick.db');


module.exports.run = async(bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Vous n'avez pas les autorisations requises ! - [ADMINISTRATEUR]**")

    try {
        let a = await db.fetch(`guildMessages_${message.guild.id}`)

        if (a) {
            return message.channel.send("**Le système d'exp est activer !**")
        } else {
            db.set(`guildMessages_${message.guild.id}`, 1)

            message.channel.send("**Les messages XP sont activés avec succès !**")
        }
        return;
    } catch (e) {
        console.log(e)
        return message.channel.send("**Quelque chose s'est mal passé !**")
    }
}
module.exports.help = {
    name: 'setexp'
}