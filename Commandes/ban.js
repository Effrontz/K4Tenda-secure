const Discord = require("discord.js")


module.exports.run = async(client, msg, args) => {
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("Vous n'avez pas la permission !")
        var embedColor = '#ffffff'
        var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
            .setColor(embedColor)
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle('Argument manquant !')
            .setDescription('Usage: `*ban ' + client.commands.get("ban").usage + '`')
            .setTimestamp();
        let bUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if (!bUser) return msg.channel.send(missingArgsEmbed);
        let bReason = args.join(" ").slice(22);
        if (!msg.member.hasPermission("MANAGE_MEMBERS")) return msg.channel.send("You haven't the right for this !");
        msg.delete().catch();

        let banEmbed = new Discord.MessageEmbed()
            .setDescription("☆━━━━━━☆ Ban ☆━━━━━━☆")
            .setColor("#ff0000")
            .addField("Utilisateur banni", `${bUser} with ID ${bUser.id}`)
            .addField("Banni par", `<@${msg.author.id}> with ID ${msg.author.id}`)
            .addField("Banni sur le channel", msg.channel)
            .addField("Temps", msg.createdAt)
        if (bReason)
            banEmebed.addField("Raison", bReason);
        
        if (bReason)
            msg.guild.member(bUser).ban(bReason);
        else
            msg.guild.member(buser).ban("Aucune raison spécifier")
        msg.channel.send(banEmbed)
}

module.exports.help = {
  name: 'ban'
}