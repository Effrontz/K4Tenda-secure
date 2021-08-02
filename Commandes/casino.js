const Discord = require("discord.js");

module.exports.run = (client, message) => {
    const slots = ["🍎", "🍉", "🍊", "🍓", "🍏", "🍒"];
    let casino = [];

    for (let i = 0; i < 9; i++) {
        casino[i] = slots[Math.floor(Math.random() * slots.length)];
    }

    return message.channel.send({
        embed: {
            author: {
                name: casino[3] === casino[4] && casino[4] === casino[5] ? "Vous avez gagné !" : "Vous avez perdu !",
                icon_url: message.author.avatarURL()
            },
            description: casino.map((item, i) => `${item}${((i + 1) % 3 === 0) ? "\n" : " | "}`).join(""),
            color: 0xff2626
        }
    });
}
module.exports.help = {
    name: "casino"
}