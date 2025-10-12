const { EmbedBuilder } = require("discord.js");
module.exports = (client, member) => {
  const welcomeChannelID = "1418256283512995982";
  const channel = client.channels.cache.get(welcomeChannelID);
  const embed = new EmbedBuilder()
    .setColor("Blue")
    .setTitle("🎉 Bienvenue !")
    .setDescription(`Salut ${member.user.username} 👋\nBienvenue sur le serveur **BUT INFO 1** !`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setFooter({ text: "Serveur BUT Informatique", iconURL: client.user.displayAvatarURL({ dynamic: true, size: 512 }) })
    .setTimestamp();
  channel.send({
    embeds: [embed],
  })
};
