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
  devOnly: true,

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.Administrator],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    let response;
    try {
      const message = await interraction.channel.send("Message Reaction Role");
      await message.react("❌");
      await message.react("⚠️");
      await message.react("✅");
      response = `Reaction role créer avec succès, message.id = ${message.id}`;
    } catch (error) {
      console.error("Erreur:", error);
      response = "Erreur lors de la création de réactionRole";
    }
    interraction.reply({ content: response, ephemeral: true });
  },
};
