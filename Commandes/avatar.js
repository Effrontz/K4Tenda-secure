const Discord = require('discord.js')

module.exports.run = async(message) => {
	if (!message.mentions.users.size) {
		return message.channel.send(`Votre avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);		
    }

	const avatarList = message.mentions.users.map(user => {
		return `${user.username}'s avatar: <${user.displayAvatarURL({ dynamic: true })}>`;
	});

	message.channel.send(avatarList);
}
module.exports.help = {
    name: 'avatar'
}