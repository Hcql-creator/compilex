const autoModeration = require("../messageCreate/autoModeration");

module.exports = (client, oldMessage, newMessage) => {
  if (newMessage.guild.id !== "1418256830890770577") return;
  autoModeration(client, newMessage);
};
