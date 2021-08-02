const http = require("http")

module.exports = {

  duration: function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return [sec, min, hrs, days]
  },

  generateKey: function () {
    const characters = 'ABCEFGHJKLNPQRSTUWXYZ1245780'
    let output = ''

    for (let i = 0; i < 5; i += 1) {
      for (let y = 0; y < 4; y += 1) {
        const random = Math.floor((Math.random() * 35) + 1)
        const char = characters.charAt(random)
        output += char
      }

      if (i !== 5) {
        output += '-'
      }
    }

    return output
  },

  longDate: function (date) {
    return new Date(date).toLocaleString('en-GB', { dateStyle: 'full' })
  },

  shortDate: function (date) {
    return new Intl.DateTimeFormat('en-GB').format(date)
  },

  trim: function (str, max) {
    if (!str) throw new TypeError('Trim Function Error', 'Must define the string to trim')
    if (!max) throw new TypeError('Trim Function Error', 'Must define how much to trim');
    ((str.length > max) ? `${str.slice(0, max, -3)}...` : str)
  },

  cleanCode: function (text) {
    if (typeof (text) === 'string') { return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) } else return text
  },

  formatName: function (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
  },
  randomNumber: function (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },
  nsfw: function (message, cmd) {
    if (!message.channel.nsfw) {
      message.util.send("Vous devez etre dans un channel NSFW")
      return true
    }

    http.get(`http://163.172.234.199:925/api/v1/${cmd}`, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        message.util.send({
          embed: {
            title: "L'image ne s'affiche pas ?",
            url: JSON.parse(data).url,
            timestamp: new Date(),
            image: {
              url: JSON.parse(data).url
            }
          }
        })
      });

    })
    return false
  }
}