module.exports.run = async(client, message, args) => {

    if (!message.guild) return;

    if (message.content === '*join') {
        if (message.member.voice.channel) {
            const connect = await message.member.voice.channel.join()
            return message.channel.send("Connectée ✅")
        } else {
            message.reply("J'ai réussi a rejoindre votre channel vocal !")
        }
    }
}
module.exports.help = {
    name: 'join'
}