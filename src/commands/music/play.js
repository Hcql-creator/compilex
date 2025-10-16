const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "play",

  // Description de la commande
  description: "aa",

  // Paramètres de la commande
  options: [
    {
      name: "url",
      description: "Youtube / XXX",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "paroles",
      description: "Renvoie les paroles de la vidéo / musique sélectionnée",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.Administrator],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Optionel: Active la commande uniquement sur le testServer configuré dans config.json
  testOnly: false,

  // Optionnel: Active la commande uniquement pour les développeurs ajoutés dans config.json
  devOnly: true,

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: (client, interraction) => {
    const musicChannelID = "XXXXXXX";

    // On vérifie si l'utilisateur est dans un voc

    // On vérifie s'il est dans le salon music, sinon -> Erreur

    // On récupère les paroles (permet de voir si le lien est valide)

    // On joue la musique
  },
};
