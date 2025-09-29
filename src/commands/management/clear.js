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
  name: "clear",

  // Description de la commande
  description: "Efface les messages",

  // Paramètres de la commande
  options: [
    {
      name: "nombre",
      description: "Sélectionnez un nombre de messages à effecer",
      required: true,
      type: ApplicationCommandOptionType.Integer,
    },
  ],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.ManageMessages],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    let nombreMessages = interraction.options.getInteger("nombre");
    if (nombreMessages >= 100) {
      for (let i = 1; i < nombreMessages / 100; i += 1) {
        await interraction.channel.bulkDelete(100, true);
      }
    }
    (a = interraction.options.getInteger("nombre") % 100),
      await interraction.channel.bulkDelete(a, true);
    const responseEmbed = embedCreator(
      interraction,
      "#FF0000",
      "Messages supprimés avec succès !",
      `${nombreMessages} messages ont été effacés.`
    );
    return interraction.reply({
      embeds: [responseEmbed],
    });
  },
};
