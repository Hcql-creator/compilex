const { EmbedBuilder, ThreadAutoArchiveDuration } = require("discord.js");

module.exports = (
  interaction,
  color,
  title,
  description,
  thumbnail = "",
  image = "",
  footer = true,
  timestamp = true
) => {
  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description);

  if (footer) {
    if (interaction.user) {
      embed.setFooter({
        text:
          interaction.member.nickname ??
          interaction.user.globalName ??
          interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      });
    }
    else {
      embed.setFooter({
        text:
          interaction.member.nickname ??
          interaction.author.globalName ??
          interaction.author.tag,
        iconURL: interaction.author.displayAvatarURL(),
      });
    }
  }

  if (thumbnail) {
    embed.setThumbnail(thumbnail);
  }

  if (image) {
    embed.setImage(image);
  }

  if (timestamp) {
    embed.setTimestamp();
  }
  return embed;
};
