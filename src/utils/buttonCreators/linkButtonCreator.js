const { ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = (emoji = "", label, url) => {
  const button = new ButtonBuilder()
    .setLabel(label)
    .setStyle(ButtonStyle.Link)
    .setURL(url);
  if (emoji) {
    button.setEmoji(emoji);
  }
  return button;
};
