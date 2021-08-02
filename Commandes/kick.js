const Discord = require("discord.js")


module.exports.run = async(client, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Vous n'avez pas la permission pour ça !");
        var embedColor = '#ffffff'
        var missingArgsEmbed = new Discord.MessageEmbed() // Creates the embed thats sent if the command isnt run right
            .setColor(embedColor)
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle('Argument manquant !')
            .setDescription('Usage: `*kick ' + client.commands.get("kick").usage + '`')
            .setTimestamp();

        let kUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if (!kUser) return msg.channel.send(missingArgsEmbed);
        if (kUser.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Cette personne ne peut pas être expulsée !");
        msg.delete().catch();
        let kReason = args.join(" ").slice(22);

        let kickEmbed = new Discord.MessageEmbed()
            .setDescription("☆━━━━━━☆ Kick ☆━━━━━━☆")
            .setColor("#ff0000")
            .addField("Utilisateur expulser", `${kUser} with ID ${kUser.id}`)
            .addField("Expulser par", `<@${msg.author.id}> with ID ${msg.author.id}`)
            .addField("Expluser depuis le channel", msg.channel)
            .addField("Temps", msg.createdAt)
        if (kReason)
            kcikEmebed.addField("Raison", kReason);
        
        if (kReason)
            msg.guild.member(bUser).kick(kReason);
        else
            msg.guild.member(buser).kick("Aucune raison spécifier")
        msg.channel.send(kickEmbed)
}

module.exports.help = {
    name: 'kick'
}