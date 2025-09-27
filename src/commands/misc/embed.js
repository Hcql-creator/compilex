const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,
  EmbedBuilder,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const embedCreator = require("../../utils/embeds/embedCreator");

module.exports = {
  // Nom de la commande
  name: "embed",

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
    // inside a command, event listener, etc.
    const embed = embedCreator(
      interraction,
      "#FF0000",
      "Embed title",
      "Embed description to tell about what is the embed about"
    );
    interraction.reply({ embeds: [embed] });
  },
};
