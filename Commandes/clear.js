const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Désolé Tu n'as pas la permission :)`).catch(console.error);
    
    if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Le bot n'a pas la permission requise pour exécuter cette commande !`).catch(console.error);
    
    if(!args[0]) return message.channel.send(`Vous devez entrer un nombre de message à supprimer !`);

    if(isNaN(args[0])) return message.channel.send(`Vous devez entrer un nombre !`);

    message.channel.bulkDelete(args[0]);

    message.channel.send(`${args[0]} messages ont été supprimés !`);
};

module.exports.help = {
    name: "clear"
}