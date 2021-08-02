const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    const corona = await fetch('https://api.covid19api.com/summary')
    .then(res => res.json())
    .then(json => json.Global);

    const covEmbed = new Discord.MessageEmbed()
    .setTitle(`Informations sur le coronavirus dans le monde`)
    .setDescription(`__Selon les dernières information disponibles :__
    
    :mask: - Nombre de cas au total : ${corona.TotalConfirmed}
    
    :headstone:  - Nombre de décès : ${corona.TotalDeaths}
    
    :bed: - Nombre d'hospitalisation (au total) : ${corona.TotalRecovered}`)
    .setColor('#6DDB42')
    return message.channel.send(covEmbed);
};

module.exports.help = {
    name: 'covid'
};