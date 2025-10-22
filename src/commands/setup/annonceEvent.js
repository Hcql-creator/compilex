const embedCreator = require("../../utils/embeds/embedCreator");
const linkButtonCreator = require("../../utils/buttonCreators/linkButtonCreator");
const blankEmbedField = require("../../utils/embeds/blankEmbedField");
const embedField = require("../../utils/embeds/embedField");

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
  name: "event",
  deleted: true,

  // Description de la commande
  description: "Creation Event",
  devOnly: true,

  // Paramètres de la commande
  options: [],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.Administrator],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Optionel: Active la commande uniquement sur le testServer configuré dans config.json
  testOnly: false,
  devOnly: true,
  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    const embed = embedCreator(
      interraction,
      "Red",
      "SpookNament",
      "📢 @everyone NOUVEL ÉVÉNEMENT ! 🎃 \n🔥 Le SpookNament débarque ce samedi à 16h !\n🏆 25€ Steam à gagner pour le grand vainqueur\n👑 + un rôle exclusif Gagnant de l’Événement \n\nÉvénement organisé par Neutsh et qui se disputera en plusieurs petit jeux\n💪Préparez vos skills et venez tenter votre chance !",
    ""   
    );

    const message = interraction.channel.send({
      content: "",
      embeds: [embed],
    });

    await message.react("✅");
    await message.react("❌");

    interraction.reply({ content: message});
  },
};
