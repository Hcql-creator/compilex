const { StringSelectMenuBuilder } = require("discord.js");

module.exports = (customID, placeholder) => {
  const menu = new StringSelectMenuBuilder()
    .setCustomId(customID)
    .setPlaceholder(placeholder);
  return menu;
};
