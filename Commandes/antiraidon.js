module.exports.run = async(client, message, args) => {
    if (message.author.id !== client.user.id)return;
    message.delete();
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send("Vous n'avez pas la permission");
    if (!client.lockit) client.lockit = [];
            let validUnlocks = ["release", "unlock"];

            if (validUnlocks.includes()) {
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: null,
                        SPEAK: null
                    });
                });
            } else {
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: false,
                        SPEAK: false
                    });
                });
            }
            var antiraodon = new Discord.RichEmbed()
                .setTitle('**L\'anti raid est activé .**')
                .setColor(color)
                .setTimestamp()
            .setFooter(`K4Tenda - Secure`, message.author.avatarURL)

            message.channel.send(antiraodon);
        
    
}
module.exports.help = {
    name: 'antiraidon'
}