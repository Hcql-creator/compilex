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
  name: "unlock",
  // Description de la commande
  description: "Deverouille un salon (personne ne peut écrire)",
  devOnly: true,

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.ManageChannels],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interaction) => {
    // ON récupère tous les roles étudiant
    const roleEtudiant = interaction.guild.roles.cache.find(
      (role) => role.name === "etudiant"
    );

    // SI aucun role étudiant on renvoie une erreur
    if (!roleEtudiant) {
      return interaction.reply({
        content: "⚠️ Le rôle **etudiant** n'existe pas sur ce serveur.",
        ephemeral: true,
      });
    }

    // ON récupère le salon à verouiller
    const salon = interaction.channel;

    try {
      // On change les permissions du salon pour le role étudiant
      await salon.permissionOverwrites.edit(roleEtudiant, {
        SendMessages: true,
        ViewChannel: true,
      });

      // On envoie un log de l'action dans le salon adéquat
      sendLog(
        interaction,
        "Salon dévérouillé",
        "Yellow",
        `**${salon.name}** n'est plus vérouillé`
      );

      // On envoie une confirmation à l'utilisateur
      await interaction.reply({
        content: `🔓 Le salon **${salon.name}** a été deverrouillé pour le rôle **${roleEtudiant.name}**.`,
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "❌ Une erreur est survenue lors du deverrouillage du salon.",
        ephemeral: true,
      });
    }
  },
};
