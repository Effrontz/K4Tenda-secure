const Discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
     
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu penser avoir la permission :smirk: ?");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage)
    console.log(`Message envoyé "${message.author.username}"`)
}
 
module.exports.help = {
    name: "say"
}