const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonStyle,
  InteractionCallback,
} = require("discord.js");
const embedCreator = require("../../utils/embeds/embedCreator");
const buttonCreator = require("../../utils/buttonCreators/buttonCreator");

module.exports = {
  // Nom de la commande
  name: "setupticket",

  // Description de la commande
  description: "aa",

  // Paramètres de la commande
  options: [],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.Administrator],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Optionel: Active la commande uniquement sur le testServer configuré dans config.json
  testOnly: false,

  // Optionnel: Active la commande uniquement pour les développeurs ajoutés dans config.json
  devOnly: false,

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: (client, interraction) => {
    const channelID = "1422464293470867506";
    const channel = client.channels.fetch(channelID);
    const ticketEmbed = embedCreator(
      interraction,
      "#ffA500",
      "Demande d'aide",
      "Cliquez sur le bouton ci-dessous pour ouvrir une demande d'aide",
      "",
      "",
      false,
      false
    );
    const row = new ActionRowBuilder();
    row.addComponents(
      buttonCreator(
        "ticketCreateButton",
        "Créer un ticket",
        "🏷️",
        ButtonStyle.Success
      )
    );
    interraction.channel.send({ embeds: [ticketEmbed], components: [row] });
  },
};
