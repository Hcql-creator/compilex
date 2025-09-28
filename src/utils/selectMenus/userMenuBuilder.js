const { UserSelectMenuBuilder } = require("discord.js");

module.exports = (id, placeholder, minValues = 1, maxValues = 10) => {
  const userSelect = new UserSelectMenuBuilder()
    .setCustomId(id)
    .setPlaceholder(placeholder)
    .setMinValues(minValues)
    .setMaxValues(maxValues);
  return userSelect;
};
