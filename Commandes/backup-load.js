const backup = require('discord-backup');

module.exports.run = async(client, message, args) => {
      if(!message.member.hasPermission('ADMINISTRATOR')){
        return message.channel.send(':x: You need to have the manage messages permissions to create a backup in this server.');
    }

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send(':warning: Tous les channels, rôles et paramètres du serveur seront effacés. Voulez-vous continuer? Envoyez `*confirm` ou `cancel` !');

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['*confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === '*confirm';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('Backup chargée avec succès !');
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return message.channel.send(":x: Aucune sauvegarde trouvée pour l'ID "+backupID+"!");
                    else
                        return message.author.send(":x: Une erreur s'est produite : "+(typeof err === "string") ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send(':x: Annulé.');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send(':x: La commande a expiré ! Veuillez réessayer.');
        })

    }).catch(() => {
        return message.channel.send(":x: Aucune sauvegarde trouvée pour l'ID "+backupID+"!");
    });

}
module.exports.help = {
    name: 'load-backup'
}