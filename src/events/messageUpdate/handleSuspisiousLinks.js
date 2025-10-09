const handleSuspisiousLinks = require("../messageCreate/handleSuspisiousLinks");

module.exports = (client, oldMessage, newMessage) => {
  if (interaction.guild.id !== "1418256830890770577") return;
  handleSuspisiousLinks(client, newMessage);
};
