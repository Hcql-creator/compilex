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
  name: "note",
  deleted: true,

  // Description de la commande
  description: "aa",
  devOnly: true,

  // Paramètres de la commande
  options: [],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.Administrator],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Optionel: Active la commande uniquement sur le testServer configuré dans config.json
  testOnly: false,

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: (client, interraction) => {
    const embed = embedCreator(
      interraction,
      "#3f8ef6",
      "Nouvelle Note Disponible",
      "La note du DS2 (examen papier) est disponible.\n\n **Matière:** R1.01\n",
      "https://www.digischool.fr/articles/_next/image/?url=https%3A%2F%2Fcms.digischool.fr%2Fwp-content%2Fuploads%2F2023%2F04%2FAdobeStock_26000584-1-min-scaled.jpeg&w=1920&q=75",
      "",
      false,
      true
    );

    embed.addFields(
      blankEmbedField(),
      embedField("Note Min.", "01.00", true),
      embedField("Moyenne", "09.94", true),
      embedField("Note Max.", "19.00", true),
      embedField("Coefficient", "35"),
      blankEmbedField()
    );

    embed.setFooter({
      text: "⠀",
      iconURL: client.user.displayAvatarURL({ dynamic: true, size: 512 }),
    });

    const row = new ActionRowBuilder();

    row.addComponents(
      linkButtonCreator(
        "",
        "Consulter ma note",
        "https://notes.iut.u-bordeaux.fr/"
      )
    );

    interraction.channel.send({
      content: "",
      embeds: [embed],
      components: [row],
    });
  },
};
