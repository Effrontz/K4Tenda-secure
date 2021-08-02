module.exports.run = async(client, message, args) => {

    if (!message.guild) return;

    if (message.content === '*disconnect') {
        if (message.member.voice.channel) {
            const connect = await message.member.voice.channel.leave()
            return message.channel.send("Déconnecter ✅")
        } else {
            message.reply("J'ai réussi a quitter votre channel vocal !")
        }
    }
}
module.exports.help = {
    name: 'disconnect'
}