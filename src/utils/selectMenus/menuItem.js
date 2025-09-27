const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
  ActionRowBuilder,
} = require("discord.js");

module.exports = (emoji = "", label, description, value, selected = false) => {
  const menuItem = new StringSelectMenuOptionBuilder()
    .setLabel(label)
    .setDescription(description)
    .setValue(value);
  if (emoji) {
    menuItem.setEmoji(emoji);
  }
  if (selected) {
    menuItem.setDefault(true);
  }
  return menuItem;
};
