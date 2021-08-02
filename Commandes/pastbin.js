const discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const sourcebin = require("sourcebin_js");

module.exports.run = async(client, message, args) => {
    message.delete();
    const Content = args.join(" ");
    sourcebin
      .create([
        {
          title: "JavaScript code",
          description: 'Ce code a été créé en "' + message.createdAt + '"',
          name: "Fait par " + message.author.username,
          content: Content,
          languageId: "JavaScript"
        }
      ])
      .then(src => {
        let embed = new discord.MessageEmbed()
          .setTitle(`Pastebin`)
          .setColor("RANDOM")
          .setDescription(`Code:\n${Content}\n\n**[Cliquer ici](${src.url})**`);
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel.send(`Erreur, réessayez plus tard`);
      });
}
module.exports.help = {
    name: 'pastbin'
}