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
    // On récupère le nombre de tickets saisis par l'utilisateur
    let a = interraction.options.getInteger("nombre");

    // Si le nombre de messages à supprimer est supérieur ou égal à 100
    if (a >= 100) {
      // On supprime tous les messages via bulkDelete jusqu'a ce qu'il reste un nombre de messages à supprimer < 100
      for (let i = 1; i < a / 100; i += 1) {
        await interraction.channel.bulkDelete(100, true);
      }
    }

    // On récupère le nombre de messages restant à supprimer
    a = interraction.options.getInteger("nombre") % 100;

    // On supprime les messages restants
    await interraction.channel.bulkDelete(a, true);

    // On envoie un log de cette suppression
    sendLog(
      interraction,
      "Messages Effacés",
      "Orange",
      `Les messages ont été effacés dans le salon **${
        interraction.channel.name
      }**. \n**${interraction.options.getInteger(
        "nombre"
      )}** messages ont été effacés`
    );

    // On informe l'utilisateur que les messages ont bien étés supprimés
    return interraction.reply({
      content: "Messages effacés avec succès !",
      ephemeral: true,
    });
  },
};
