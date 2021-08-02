const Discord = require('discord.js');
const { Manager } = require('erela.js')
const { readdirSync } = require("fs");
const config = require("./config.json")
const client = new Discord.Client()
const db = require('quick.db');

client.login(config.token)

const fs = require('fs')

client.commands = new Discord.Collection();

fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouvée !");

    commandes.forEach((f) => {

        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commande chargée !`);

        client.commands.set(commande.help.name, commande);
  });
});

fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`)

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

        client.on(event, events.bind(null, client));
    });
});

//anti-insulte
//client.on("message", async message => {
  //  if(message.author.bot) return;
    //if(message.member.hasPermission("ADMINISTRATOR")) return;
//    if(message.content.includes("https://") || message.content.includes("http://") || message.content.includes("www.") || message.content.includes(".fr") || message.content.includes(".com") || message.content.includes(".org") || message.content.includes(".xyz") || message.content.includes(".gg")){
//      message.delete()
//      let embed675 = new Discord.MessageEmbed()
//      .setColor("#ff0005")
//      .setDescription(":x: Filtre anti-lien : les liens sont interdits !")
//      .setFooter("©K4A'TV | 2021")
//      message.channel.send(embed675)
 //   }
///});



//anti-insulte
client.on("message", async message => {
    if(message.author.bot) return;
    if(message.member.hasPermission("ADMINISTRATOR")) return;
    if(message.content.includes("fdp") || message.content.includes("fils de pute") || message.content.includes("connard") || message.content.includes("connasse") || message.content.includes("pute") || message.content.includes("pd") || message.content.includes("salope") || message.content.includes("salop") || message.content.includes("tg") || message.content.includes("ntm")|| message.content.includes("con") || message.content.includes("enfoire") || message.content.includes("conne") || message.content.includes("petasse") || message.content.includes("batard") || message.content.includes("nique ta mere") || message.content.includes("ta gueule")){
      message.delete()
      let embed675 = new Discord.MessageEmbed()
      .setColor("#ff0005")
      .setDescription(":x: Ce mots est interdit.")
      .setFooter("©K4A'TV | 2021")
      message.channel.send(embed675)
    }
});

client.on('inviteCreate', async => {
  const invembed = new Discord.MessageEmbed()
  .setTitle('Invitation crée')
  .setDescription('Chef, une personne viens de crée une invitation !')
  .setFooter('Logs invite | K4Tenda')
  const channel = client.channels.cache.find(channel => channel.id === "870957873918787664")
  channel.send(invembed)
  
})

client.on('inviteDelete', async => {
  const invembed5 = new Discord.MessageEmbed()
  .setTitle('Invitation supprimé')
  .setDescription('Chef, une personne viens de supprimé une invitation !')
  .setFooter('Logs invite | K4Tenda')
  const channel = client.channels.cache.find(channel => channel.id === "870957873918787664")
  channel.send(invembed5)
})

client.on('messageDelete', message => {
  if(!message.partial) {
      const channel = client.channels.cache.get('870957873918787664');
      if(channel) {
          const embed5l2 = new Discord.MessageEmbed()
              .setTitle('Message supprimé')
              .addField('Auteur du message', `**${message.author.tag}**`, true)
              .addField('Channel', `${message.channel.name} `, true)
              .setDescription(message.content)
              .setTimestamp();
          channel.send(embed5l2);
      }
  }
});


client.on('guildBanAdd', async (guild, user) => {
  const banembed = new Discord.MessageEmbed()
  .setTitle('Utilisateur banni')
  .setDescription(`${user.tag} a été banni. du serveur ${guild.name}`)
  .setFooter('Logs Ban | K4Tenda')
  const channel = client.channels.cache.find(channel => channel.id === "870957873918787664")
  channel.send(banembed)
})


client.on('guildBanRemove', async => {
  const banembed4 = new Discord.MessageEmbed()
  .setTitle('Utilisateur Débanni')
  .setDescription(`${user} a été Débanni.`)
  .setFooter('Logs UnBan | K4Tenda')
  const channel = client.channels.cache.find(channel => channel.id === "870957873918787664")
  channel.send(banembed4)
})


  client.on('ready', function() {
  
  //let coembed = new Discord.MessageEmbed()
//  .setTitle('Connexion...')
  //.setColor('BLACK')
//  .addField("Bot oppérationnel")
  //.setFooter('K4Tenda | On')
//  .setTimestamp()
  //const channel = client.channels.cache.find(channel => channel.id === "870957873918787664")
//  channel.send(coembed)
  return console.log("Bot Connecter !")  
    
})


client.on('guildCreate', guild => {
  var serverIcon = guild.iconURL();
  let embed = new Discord.MessageEmbed()
  .setTitle(guild.name)
  .setThumbnail(guild.iconURL())
  .setColor("#25c059")
  .addField(`Maintennant sur ${client.guilds.cache.size} serveurs !`)
  .setDescription(`Bonne Nouvelle ! ${guild.name} vient d'ajouté K4Tenda dans son serveur 🙂`)
  .setThumbnail(serverIcon)
  .setTimestamp()
  const channel = client.channels.cache.find(channel => channel.id === "870957873918787664")
  channel.send(embed)
  return console.log(`K4Tenda a été ajoutez sur le serveur ${guild.name} Nice un serveur en plus ! / Maintennant sur ${client.guilds.cache.size} serveur !`)
})
client.on('guildDelete', guild => {
  var serverIcon = guild.iconURL();
  let embed = new Discord.MessageEmbed()
  .setTitle(guild.name)
  .setColor("#ff0000")
  .addField(`Maintennant sur: ${client.guilds.cache.size} serveurs !`)
  .setDescription(`Mauvaise Nouvelle, ${guild.name} vient de supprimé K4Tenda de son serveur 🙁`)
  .setThumbnail(serverIcon)
  .setTimestamp()
  const channel = client.channels.cache.find(channel => channel.id === "870957873918787664")
  channel.send(embed)
  return console.log(`K4Tenda a été retiré du serveur ${guild.name} Pas cool tout ca.. / Maintennant sur ${client.guilds.cache.size} serveur !`)
}) 

client.on('guildMemberAdd', async member => {
  var channel = null;
  member.guild.channels.cache.get("870957873918787664")
  const cachedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
      const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.users);
      const embedG = new Discord.MessageEmbed()
      .setDescription("Un nouveau membre a rejoind votre serveur!")
      .addField('Name', `${member.user.tag}`, true)
      .addField('Nombre de membres dans le serveur:', `${member.guild.memberCount}`, false)
      .addField('Invitez le nombre d\'Utilisations:', `${usedInvite.uses}`, true)
      .addField('Invitez par:', `${usedInvite.inviter.tag}`, false)
      .setTimestamp()
      .setFooter('K4Tenda | MemberLogs')
      channel.send(embedG)
  } catch (err) {
      console.log(err);
  }
})

