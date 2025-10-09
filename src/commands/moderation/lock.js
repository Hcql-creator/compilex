const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const log = require("../../utils/sendLog");
const sendLog = require("../../utils/sendLog");

module.exports = {
  // Nom de la commande
  name: "lock",
  // Description de la commande
  description: "Verrouiller un salon (personne ne peut écrire)",
  devOnly: true,

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.ManageChannels],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interaction) => {
    const roleEtudiant = interaction.guild.roles.cache.find(
      (role) => role.name === "etudiant"
    );

    if (!roleEtudiant) {
      return interaction.reply({
        content: "⚠️ Le rôle **etudiant** n'existe pas sur ce serveur.",
        ephemeral: true,
      });
    }

    const salon = interaction.channel;

    try {
      await salon.permissionOverwrites.edit(roleEtudiant, {
        SendMessages: false,
        ViewChannel: true,
      });

      await interaction.reply({
        content: `🔒 Le salon **${salon.name}** a été verrouillé pour le rôle **${roleEtudiant.name}**.`,
      });
      sendLog(
        interaction,
        "Salon verouillé",
        "Yellow",
        `Le salon **${salon.name}** a été vérouiller pour le role **${roleEtudiant.name}**`
      );
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "❌ Une erreur est survenue lors du verrouillage du salon.",
        ephemeral: true,
      });
    }
  },
};
