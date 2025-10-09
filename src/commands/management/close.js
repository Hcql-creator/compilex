const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const sendLog = require("../../utils/sendLog");

module.exports = {
  // Nom de la commande
  name: "close",

  // Description de la commande
  description: "Ferme un salon",
  devOnly: true,

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [
    PermissionFlagsBits.ManageChannels,
    PermissionFlagsBits.ManageMessages,
  ],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    const salon = interraction.channel;
    try {
      sendLog(
        interraction,
        "Salon fermé",
        "Yellow",
        `**${salon.name}** a été fermé`
      );
      await salon.delete();
    } catch {
      interraction.reply("Ca pas marché t'es con ou quoi - bg");
    }
  },
};
