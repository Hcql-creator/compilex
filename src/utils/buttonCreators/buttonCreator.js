const { ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = (id, emoji = "", label, style = ButtonStyle.Primary) => {
  const button = new ButtonBuilder()
    .setCustomId(id)
    .setLabel(label)
    .setStyle(style);
  if (emoji) {
    button.setEmoji(emoji);
  }
  return button;
};
