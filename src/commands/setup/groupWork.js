const embedCreator = require("../../utils/embeds/embedCreator");
const embedField = require("../../utils/embeds/embedField");
const blankEmbedField = require("../../utils/embeds/blankEmbedField");
const buttonCreator = require("../../utils/buttonCreators/buttonCreator");
const linkButtonCreator = require("../../utils/buttonCreators/linkButtonCreator");

const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "groupwork",

  // Description de la commande
  description: "Créer le message interractif de création de groupe",

  // Paramètres de la commande
  options: [],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: (client, interraction) => {
    const showcaseMessage = embedCreator(
      interraction,
      "#04b4d7",
      "Travail de groupe",
      "Créer votre salon privé avec vos camarades de classe pour travailler en groupe !",
      "https://www.teachhub.com/wp-content/uploads/2020/09/Sept-9-Benefits-of-Group-Work_web.jpg",
      "",
      false,
      false
    ).addFields(
      blankEmbedField(),
      embedField("Nombre de participants", "1 - illimité", true),
      embedField("Durée du salon", "Illimitée (fin du travail)", true),
      embedField(
        "Objectif",
        "Éviter de créer un groupe Discord / Insta à chaque travail de groupe"
      ),
      blankEmbedField()
    );
    const row = new ActionRowBuilder();
    row.addComponents(
      buttonCreator(
        "groupWorkStartButton",
        "Commencer",
        "⏲️",
        ButtonStyle.Success
      ),
      linkButtonCreator(
        "",
        "Comment ça marche",
        "https://notre-site-demo.vercel.app"
      )
    );

    interraction.channel.send({
      embeds: [showcaseMessage],
      components: [row],
    });
  },
};
