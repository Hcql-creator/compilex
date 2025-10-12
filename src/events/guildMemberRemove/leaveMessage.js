const { EmbedBuilder } = require("discord.js");
module.exports = (client, member) => {
  const welcomeChannelID = "1418256322021031966";
  const channel = client.channels.cache.get(welcomeChannelID);
  const embed = new EmbedBuilder()
    .setColor("Orange")
    .setTitle("Au revoir 😭 !")
    .setDescription(`C'est ciao ${member.user.username} 👋`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setFooter({ text: "Serveur BUT Informatique", iconURL: client.user.displayAvatarURL({ dynamic: true, size: 512 }) })
    .setTimestamp();
  channel.send({
    embeds: [embed],
  })
};
