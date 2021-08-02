
const { Database } = require('sqlite3');
const { randomNumber } = require('./Functions');
const db = new Database("./data/db.sqlite")
module.exports = {
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        {
          resolve(result);
        }
      });
    });
  },
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastId });
        }
      });
    });
  },
  getGuild(serverId) {
    return new Promise(async (resolve) => {
      let guild = await this.get('SELECT * FROM Guilds WHERE ServerId = ?', [
        serverId,
      ]);
      if (!guild) {
        await this.createGuild(serverId);
        guild = await this.get('SELECT * FROM Guilds WHERE ServerId = ?', [
          serverId,
        ]);
      }
      resolve(guild);
    });
  },
  createGuild(serverId) {
    return new Promise(async (resolve) => {
      await this.run(
        `INSERT INTO Guilds (ServerId,XpMulti,Prefix,WelcomeChannel,WelcomeJoin,WelcomeLeaves)
        VALUES (?, ?, ?,?,?,?)`,
        [
          serverId,
          1,
          process.env.PREFIX,
          '',
          'Le joueur %Joined_name% vient de rejoindre et a été invité par %invited_by% (%invited_count%)',
          '',
        ]
      );
      resolve(true);
    });
  },
  createUser(userId, serverId, inviteId) {
    return new Promise(async (resolve) => {
      await this.run(
        `INSERT INTO Users (UserId, ServerId, Mute,Exp,Level,
				IId )
        VALUES (?, ?, ?,?,?,?)`,
        [userId, serverId, 0, 0, 1, inviteId]
      );
      await this.run(
        `INSERT INTO Invites (UserId, ServerId, ILeaves,IJoin,IFake,IBonus )
        VALUES (?, ?, ?,?,?,?)`,
        [userId, serverId, 0, 0, 0, 0]
      );
      resolve(true);
    });
  },
  getUser(userId, serverId, inviteId = '') {
    return new Promise(async (resolve) => {
      let user = await this.get(
        'SELECT * FROM Users WHERE UserId = ? AND ServerId = ?',
        [userId, serverId]
      );
      if (!user) {
        await this.createUser(userId, serverId, inviteId);
        user = await this.get(
          'SELECT * FROM Users WHERE UserId = ? AND ServerId = ?',
          [userId, serverId]
        );
      }
      resolve(user);
    });
  },
  async addXp(userId, serverId) {
    const user = await this.getUser(userId, serverId)
    const guilds = await this.getGuild(serverId);
    user.Exp += randomNumber(1, 6) * guilds.XpMulti;

    if (user.Level * user.Level * 85 <= user.Exp) {
      this.run(
        `UPDATE Users SET Level = ?, Exp = ? WHERE UserId = ? AND ServerId = ?;`,
        [++user.Level, user.Exp, userId, serverId]
      );
    } else {
      this.run(
        `UPDATE Users SET Exp = ? WHERE UserId = ? AND ServerId = ?;`,
        [user.Exp, userId, serverId]
      );
    }
  },
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}