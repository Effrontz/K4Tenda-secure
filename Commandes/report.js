const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Discord = require('discord.js')

module.exports.run =  async(client, message, args) => {
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() 

        if (!rMember)
            return message.reply("Vous n’avez pas trouvé cette personne?").then(m => m.delete(5000));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Impossible de report ce membre").then(m => m.delete(5000));

        if (!args[1])
            return message.channel.send("Veuillez fournir une justification du report.").then(m => m.delete(5000));
        
            const channel = client.channels.cache.find(channel => channel.id === "870057921038405632")
            
        if (!channel)
            return message.channel.send("Impossible de trouver un channel « #reports »").then(m => m.delete(5000));

        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**- Membre:** ${rMember} (${rMember.user.id})
            **- Report par:** ${message.member}
            **- Report dans le channel:** ${message.channel}
            **- Raison:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
}
module.exports.help = {
    name: 'report'
}