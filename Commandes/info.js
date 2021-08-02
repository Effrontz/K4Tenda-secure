
const disbut = require('discord-buttons');



module.exports.run = async(client, message, args) => {
    let button = new disbut.MessageBoutton()
.setStyle('red')
.setLabel('Invitez moi')
.setID('click_to_function')
.setURL('https://discordapp.com/oauth2/authorize?client_id=868902619110834197&scope=bot&permissions=8')
.setDisable();

let button6 = new disbut.MessageBoutton()
.setStyle('red')
.setLabel('Le site web')
.setID('click_to_function')
.setURL('https://legenda0520.github.io')
.setDisable();

message.channel.send("Voici quelque information :", button, button6)
}
module.exports.help = {
    name: 'info'
}