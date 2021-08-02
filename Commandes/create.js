const backup = require('discord-backup');
const { DiscordAPIError } = require('discord.js');
const log = "870957873918787664"

module.exports.run = async(client, message, args) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: Vous devez disposer des autorisations de gestion des messages pour créer une sauvegarde sur ce serveur.');
    }

    backup.create(message.guild).then((backupData) => {

        return message.channel.send('Sauvegarde créée ! Voici votre identifiant : `'+backupData.id+'` Utiliser `*load-backup '+backupData.id+'` pour charger la sauvegarde sur un autre serveur !');

    }).catch(() => {

        return message.channel.send(":x: Une erreur s'est produite, veuillez la signaler au serveur de support ");

    });

    

}
module.exports.help = {
    name: 'create'
}