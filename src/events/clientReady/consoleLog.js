const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.user.setActivity("your stupid code", { type: ActivityType.Watching });
  console.log(`🟢 ${client.user.tag} is online.`);
};
