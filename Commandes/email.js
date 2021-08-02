const Discord = require('discord.js')
const chancejs = require('chance')
const chance = new chancejs();


module.exports.run = async(client, message, args) => {

    message.delete()

    var email =
chance.email({
    domain: "gmail.com"
}) 
        
    message.channel.send("__**Voici Votre email :" + email + "**__")
}

module.exports.help = {
    name: 'email'
}