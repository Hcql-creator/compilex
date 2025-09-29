const buttonCreator = require("../../utils/buttonCreators/buttonCreator");
const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "test",

  // Description de la commande
  description: "aaa",

  // Paramètres de la commande
  options: [
    {
      name: "user",
      description: "aa",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],

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
    const row = new ActionRowBuilder();
    const user = interraction.options.getUser("user");
    const customId = `testButton|${user.id}`;
    row.addComponents(buttonCreator(customId, "getButtonID"));
    interraction.reply({ content: "test", components: [row] });
  },
};
