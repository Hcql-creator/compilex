const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "lock",
  // Description de la commande
  description: "Verrouiller un salon (personne ne peut écrire)",

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
    const successEmbed = embedCreator(
      interaction,
      "#00FF00",
      "🔒 Salon vérouillé avec succès !",
      "Les utilisateurs autres que ceux autorisés ne pourront désormais plus parler dans ce salon."
    );
    const errorEmbed = embedCreator(
      interaction,
      "#FF0000",
      "Erreur lors du vérouillage du salon.",
      "Le salon n'a pas pu être vérouillé, veuillez réessayer ultérieurement ou signaler le problème à un administrateur."
    );

    try {
      await salon.permissionOverwrites.edit(roleEtudiant, {
        SendMessages: false,
        ViewChannel: true,
      });

      await interaction.reply({
        embeds: [successEmbed],
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        embeds: [errorEmbed],
        ephemeral: true,
      });
    }
  },
};
