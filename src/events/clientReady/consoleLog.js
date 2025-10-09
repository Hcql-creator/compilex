const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.user.setActivity("résoudre p = np", { type: ActivityType.Playing });
  console.log(`🟢 ${client.user.tag} is online.`);
};
