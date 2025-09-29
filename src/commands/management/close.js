const embedCreator = require("../../utils/embeds/embedCreator");

const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "close",

  // Description de la commande
  description: "Ferme un salon",

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageMessages,
  ],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    const errorEmbed = embedCreator(
      interraction,
      "#FF0000",
      "Erreur lors de la suppression du salon.",
      "Le salon n'a pas pu être supprimé, veuillez réessayer ultérieurement ou signaler le problème à un administrateur."
    );
    const salon = interraction.channel;
    try {
      await salon.delete();
    } catch {
      interraction.reply({ embeds: [errorEmbed] });
    }
  },
};
