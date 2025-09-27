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
const menuItem = require("../../utils/selectMenus/menuItem");
const stringMenuBuilder = require("../../utils/selectMenus/stringMenuBuilder");

module.exports = {
  // Nom de la commande
  name: "menu2",

  // Description de la commande
  description: "aa",

  // Paramètres de la commande
  options: [],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: (client, interraction) => {
    const select = stringMenuBuilder("menu2", "Make a selection").addOptions(
      menuItem("✅", "option 2", "Ceci est une commande de test", "int1"),
      menuItem("❌", "Test", "Ceci est une commande de test", "int2"),
      menuItem("", "kakou kakou", "Ceci est une commande de test", "int3")
    );
    const row = new ActionRowBuilder().addComponents(select);
    interraction.reply({ content: "test", components: [row] });
  },
};
