const embedCreator = require("../../utils/embeds/embedCreator");

const {
  // Si la commande requiert des paramètres

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "reactionrole",

  // Description de la commande
  description: "Setup le reaction Role",

  // Paramètres de la commande
  options: [],
  deleted: true,

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.Administrator],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    let response;
    try {
      // On créer notre embed
      const embed = embedCreator(
        interraction,
        "#d6aa3a",
        "Choisissez votre groupe",
        "Choisissez votre groupe (A, B, C ou D), celui-ci servira à vous donner accès à votre groupe de classe et permettra aux délégués de passer des messages !"
      );

      // On envoie notre message
      const message = await interraction.channel.send({
        content: "",
        embeds: [embed],
      });

      // On ajoute nos réactions
      await message.react("🅰️");
      await message.react("🅱️");
      await message.react("©");
      await message.react("🎲");

      // On envoie l'id du message pour config l'action lors de la réaction d'un utilisateur
      response = `Reaction role créer avec succès, message.id = ${message.id}`;
    } catch (error) {
      console.error("Erreur:", error);
      response = "Erreur lors de la création de réactionRole";
    }
    interraction.reply({ content: response, ephemeral: true });
  },
};
